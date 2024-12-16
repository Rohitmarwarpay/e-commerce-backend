import Product from "../models/Product.model.js";

// Create a new product
export const createProduct = async (req, res) => {
    try {
        const { productName, images, price, actualPrice, category, description, size } = req.body;

        // If images is not an array, convert it into an array
        const imageArray = Array.isArray(images) ? images : [images];

        // Set the size with default value "M"
        const productSize = size || "M";

        // Validate size
        const validSizes = ["S", "M", "L", "XL", "XXL"];
        if (!validSizes.includes(productSize)) {
            return res.status(400).json({ message: "Invalid size. Allowed sizes are S, M, L, XL, XXL." });
        }

        // Validate actualPrice
        if (actualPrice && (actualPrice < 0 || actualPrice > price)) {
            return res.status(400).json({
                message: "Invalid actualPrice. It must be a positive value and less than or equal to price.",
            });
        }

        const product = new Product({
            productName,
            images: imageArray,
            price,
            actualPrice: actualPrice || 0, // Default to 0 if not provided
            category,
            description,
            size: productSize,
        });

        await product.save();

        res.status(201).json({ message: "Product added successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Failed to add product", error: error.message });
    }
};

// Retrieve all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json({ message: "Products retrieved successfully", products });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve products", error: error.message });
    }
};

// Retrieve a single product by ID
export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product retrieved successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve product", error: error.message });
    }
};

// Update an existing product
export const updateProduct = async (req, res) => {
    try {
        const { productName, images, price, actualPrice, category, description, size } = req.body;

        // If images is not an array, convert it into an array
        const imageArray = Array.isArray(images) ? images : [images];

        // Validate and set the size
        const productSize = size || "M";

        const validSizes = ["S", "M", "L", "XL", "XXL"];
        if (!validSizes.includes(productSize)) {
            return res.status(400).json({ message: "Invalid size. Allowed sizes are S, M, L, XL, XXL." });
        }

        // Validate actualPrice
        if (actualPrice && (actualPrice < 0 || actualPrice > price)) {
            return res.status(400).json({
                message: "Invalid actualPrice. It must be a positive value and less than or equal to price.",
            });
        }

        // Update the product
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                productName,
                images: imageArray,
                price,
                actualPrice: actualPrice || 0,
                category,
                description,
                size: productSize,
            },
            { new: true } // Return the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Failed to update product", error: error.message });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete product", error: error.message });
    }
};
