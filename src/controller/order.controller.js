import Order from "../models/Order.model.js";
import Product from "../models/Product.model.js"; // Importing Product model to get product details

// Create a new order
export const createOrder = async (req, res) => {
    try {
        const { customer, products, shippingAddress, paymentMethod } = req.body;
        if(!JSON.parse(shippingAddress)){
            return res.status(400).json({ message: "Invalid shipping address" });
        }

        // Validate if products array is provided and has at least one product
        if (!products || products.length === 0) {
            return res.status(400).json({ message: "At least one product is required" });
        }

        // Calculate total amount by summing up the prices of products and their quantities
        let totalAmount = 0;
        for (let productItem of products) {
            const product = await Product.findOne({ _id: productItem.product, isDeleted: false });
            
            if (!product) {
                return res.status(400).json({ message: `Product not found or is deleted for ID: ${productItem.product}` });
            }

            totalAmount += product.price * productItem.quantity;
        }

        const newOrder = new Order({
            customer,
            products,
            totalAmount,
            shippingAddress,
            paymentMethod,
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
        const orders = await Order.find({ isDeleted: false })  // Only non-deleted orders
            .populate("customer", "name email")
            .populate("products.product", "productName price image");

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
        // Find the order by ID and ensure it is not soft deleted
        const order = await Order.findOne({ _id: req.params.id, isDeleted: false })
            .populate("customer", "name email")
            .populate("products.product", "productName price image");

        if (!order) {
            return res.status(404).json({ message: "Order not found or has been deleted" });
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

        // Check if the provided status is valid
        if (!["pending", "processing", "shipped", "delivered", "cancelled"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        // Find the order by ID and ensure it is not soft deleted
        const order = await Order.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false }, // Ensure order is not deleted
            { status },
            { new: true } // Return the updated order
        );

        if (!order) {
            return res.status(404).json({ message: "Order not found or has been deleted" });
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
