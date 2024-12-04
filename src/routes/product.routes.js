import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts } from "../controller/Product.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const productRoutes = express.Router();

productRoutes.post("/createproduct", verifyToken, createProduct);
productRoutes.get("/getproducts", verifyToken, getProducts);
productRoutes.get("/getproduct/:id", verifyToken, getProduct);
productRoutes.delete("/delete/:id", verifyToken, deleteProduct);

export default productRoutes;
