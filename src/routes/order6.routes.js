import express from "express";
import { createOrder, deleteOrder, getOrder, getOrders, updateOrderStatus } from "../controller/order6.controller.js";
import { verifyToken6 } from "../middleware/verifyToken6.js";

const orderRoutes6 = express.Router();

orderRoutes6.post("/orders6", verifyToken6, createOrder);         // Create an order
orderRoutes6.get("/orders6", verifyToken6, getOrders);            // Get all orders
orderRoutes6.get("/orders6/:id", verifyToken6, getOrder);         // Get a specific order
orderRoutes6.put("/orders6/:id/status", verifyToken6, updateOrderStatus);  // Update order status
orderRoutes6.delete("/orders6/:id", verifyToken6, deleteOrder);   // Delete an order

export default orderRoutes6;
