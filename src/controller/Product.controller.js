import Product from "../models/Product.model.js";

export const createProduct = async (req, res) => {
    // const products= req.body;
    try {
        const { productName, image, price, category, description } = req.body;

        // Check if a product with the same name already exists

        // const existingProduct = await Product.findOne({ productName });
        // if (existingProduct) {
        //     return res.status(400).json({
        //         message: "Product with this name already exists. Please try another name."
        //     });
        // }

        const product = new Product({
            productName,
            image,
            price,
            category,
            description
        });

        await product.save();
        // const insertedProducts = await Product.insertMany(products);
        res.status(201).json({ message: "Product added successfully", insertedProducts });
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