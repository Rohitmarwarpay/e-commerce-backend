import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controller/Product7.controller.js";

const productRoutes7 = express.Router();

productRoutes7.post("/createproduct7", createProduct);
productRoutes7.get("/getproducts7", getProducts);
productRoutes7.get("/getproduct7/:id", getProduct);
productRoutes7.delete("/delete7/:id", deleteProduct);
productRoutes7.put("/products7/:id", updateProduct);

export default productRoutes7;
