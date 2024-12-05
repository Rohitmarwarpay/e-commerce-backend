import Product from "../models/Product.model.js";

export const createProduct = async (req, res) => {
    try {
        const { productName, images, price, category, description } = req.body;

        // If images is not an array, make it an array
        const imageArray = Array.isArray(images) ? images : [images];

        const product = new Product({
            productName,
            images: imageArray,  // Updated field to images
            price,
            category,
            description
        });

        await product.save();

        res.status(201).json({ message: "Product added successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Failed to add product", error: error.message });
    }
}

export const getProducts = async (req, res) => {
    try {
        // Find all products in the database
        const products = await Product.find();

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json({ message: "Products retrieved successfully", products });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve products", error: error.message });
    }
}

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
}

export const updateProduct = async (req, res) => {
    try {
        const { productName, images, price, category, description } = req.body;

        // If images is not an array, make it an array
        const imageArray = Array.isArray(images) ? images : [images];

        // Find the product by ID and update it
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                productName,
                images: imageArray,
                price,
                category,
                description,
            },
            { new: true } // This option ensures the updated document is returned
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Failed to update product", error: error.message });
    }
}

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
}