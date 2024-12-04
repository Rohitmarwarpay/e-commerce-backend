import express from "express";
import { createOrder, getOrders, getOrder, updateOrderStatus, deleteOrder } from "../controller/order.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const orderRoutes = express.Router();

orderRoutes.post("/orders", verifyToken, createOrder);         // Create an order
orderRoutes.get("/orders", verifyToken, getOrders);            // Get all orders
orderRoutes.get("/orders/:id", verifyToken, getOrder);         // Get a specific order
orderRoutes.put("/orders/:id/status", verifyToken, updateOrderStatus);  // Update order status
orderRoutes.delete("/orders/:id", verifyToken, deleteOrder);   // Delete an order

export default orderRoutes;
