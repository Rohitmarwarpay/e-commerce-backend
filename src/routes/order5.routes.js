import express from "express";
import { createOrder, deleteOrder, getOrder, getOrders, updateOrderStatus } from "../controller/order5.controller.js";
import { verifyToken5 } from "../middleware/verifyToken5.js";

const orderRoutes5 = express.Router();

orderRoutes5.post("/orders5", verifyToken5, createOrder);         // Create an order
orderRoutes5.get("/orders5", verifyToken5, getOrders);            // Get all orders
orderRoutes5.get("/orders5/:id", verifyToken5, getOrder);         // Get a specific order
orderRoutes5.put("/orders5/:id/status", verifyToken5, updateOrderStatus);  // Update order status
orderRoutes5.delete("/orders5/:id", verifyToken5, deleteOrder);   // Delete an order

export default orderRoutes5;
