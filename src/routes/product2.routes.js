import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controller/Product2.controller.js";

const productRoutes2 = express.Router();

productRoutes2.post("/createproduct2", createProduct);
productRoutes2.get("/getproducts2", getProducts);
productRoutes2.get("/getproduct2/:id", getProduct);
productRoutes2.delete("/delete2/:id", deleteProduct);
productRoutes2.put("/products2/:id", updateProduct);

export default productRoutes2;
