import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controller/Product.controller.js";

const productRoutes = express.Router();

productRoutes.post("/createproduct", createProduct);
productRoutes.get("/getproducts", getProducts);
productRoutes.get("/getproduct/:id", getProduct);
productRoutes.delete("/delete/:id", deleteProduct);
productRoutes.put("/products/:id", updateProduct);

export default productRoutes;
