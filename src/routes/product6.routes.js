import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controller/Product6.controller.js";

const productRoutes6 = express.Router();

productRoutes6.post("/createproduct6", createProduct);
productRoutes6.get("/getproducts6", getProducts);
productRoutes6.get("/getproduct6/:id", getProduct);
productRoutes6.delete("/delete6/:id", deleteProduct);
productRoutes6.put("/products6/:id", updateProduct);

export default productRoutes6;
