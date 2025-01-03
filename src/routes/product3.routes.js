import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controller/Product3.controller.js";

const productRoutes3 = express.Router();

productRoutes3.post("/createproduct3", createProduct);
productRoutes3.get("/getproducts3", getProducts);
productRoutes3.get("/getproduct3/:id", getProduct);
productRoutes3.delete("/delete3/:id", deleteProduct);
productRoutes3.put("/products3/:id", updateProduct);

export default productRoutes3;
