import mongoose from "mongoose";
import Order from "../models/Order.model.js";
import Product from "../models/Product.model.js"; // Importing Product model to get product details

// Create a new order
export const createOrder = async (req, res) => {
    try {
        const { products, shippingAddress } = req.body;
        const customer = req.user.id;

        // Validate if products array is provided and has at least one product
        if (!products || products.length === 0) {
            return res.status(400).json({ message: "At least one product is required" });
        }

        // Calculate total amount by summing up the prices of products and their quantities
        let totalAmount = 0;
        for (let productItem of products) {
            const product = await Product.findById(productItem.product);
            if (!product) {
                return res.status(400).json({ message: `Product not found for ID: ${productItem.product}` });
            }
            totalAmount += product.actualPrice * productItem.quantity;
        }

        const newOrder = new Order({
            customer,
            products,
            totalAmount,
            shippingAddress,
        });

        await newOrder.save();
        res.status(201).json({ message: "Order created successfully", order: newOrder });
    } catch (error) {
        res.status(500).json({ message: "Failed to create order", error: error.message });
    }
};

// Get all orders
export const getOrders = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming the user ID is passed as a parameter in the URL

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const orders = await Order.aggregate([
            { $match: { isDeleted: false, customer:new mongoose.Types.ObjectId(String(userId)) } }, // Exclude deleted orders
            {
                $lookup: {
                    from: "user2", // Name of the users collection (pluralized automatically by Mongoose)
                    localField: "customer", // Field in the orders collection
                    foreignField: "_id", // Matching field in the user2 collection
                    as: "userDetails", // Output array field
                },
            },
            {
                $unwind: {
                    path: "$userDetails", // Convert the array to an object if there's exactly one user per order
                    preserveNullAndEmptyArrays: true, // Keep orders without matching user details
                },
            },
            {
                $project: {
                    _id: 1,
                    "userDetails.firstName": 1, // Include specific fields from userDetails
                    "userDetails.email": 1, // Include email from userDetails
                    products: 1, // Include products array
                    totalAmount: 1, // Include totalAmount
                    shippingAddress: 1,
                    paymentStatus: 1,
                    status: 1
                },
            },
        ]);

        if (orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }

        res.status(200).json({ message: "Orders retrieved successfully", orders });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve orders", error: error.message });
    }
};

// Get a specific order by ID
export const getOrder = async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.id, isDeleted: false }) // Exclude deleted order
            .populate("customer", "name email")
            .populate("products.product", "productName price image");

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order retrieved successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve order", error: error.message });
    }
};

// Update order status (for example, when an order is shipped or delivered)
export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!["pending", "processing", "shipped", "delivered", "cancelled"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const order = await Order.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false }, // Only update if the order is not deleted
            { status },
            { new: true } // Return the updated document
        );

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order status updated", order });
    } catch (error) {
        res.status(500).json({ message: "Failed to update order status", error: error.message });
    }
};

// Delete an order
export const deleteOrder = async (req, res) => {
    try {
        // Find the order by ID and set isDeleted to true
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { isDeleted: true },
            { new: true }  // Return the updated order
        );

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order marked as deleted", order });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete order", error: error.message });
    }
};

