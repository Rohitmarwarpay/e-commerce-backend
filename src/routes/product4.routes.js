import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controller/Product4.controller.js";

const productRoutes4 = express.Router();

productRoutes4.post("/createproduct4", createProduct);
productRoutes4.get("/getproducts4", getProducts);
productRoutes4.get("/getproduct4/:id", getProduct);
productRoutes4.delete("/delete4/:id", deleteProduct);
productRoutes4.put("/products4/:id", updateProduct);

export default productRoutes4;
