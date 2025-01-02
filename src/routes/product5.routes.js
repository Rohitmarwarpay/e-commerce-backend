import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controller/Product5.controller.js";

const productRoutes5 = express.Router();

productRoutes5.post("/createproduct5", createProduct);
productRoutes5.get("/getproducts5", getProducts);
productRoutes5.get("/getproduct5/:id", getProduct);
productRoutes5.delete("/delete5/:id", deleteProduct);
productRoutes5.put("/products5/:id", updateProduct);

export default productRoutes5;
