import express from "express";
import { verifyToken3 } from "../middleware/verifyToken3.js";
import { createOrder, deleteOrder, getOrder, getOrders, updateOrderStatus } from "../controller/order3.controller.js";

const orderRoutes3 = express.Router();

orderRoutes3.post("/orders3", verifyToken3, createOrder);         // Create an order
orderRoutes3.get("/orders3", verifyToken3, getOrders);            // Get all orders
orderRoutes3.get("/orders3/:id", verifyToken3, getOrder);         // Get a specific order
orderRoutes3.put("/orders3/:id/status", verifyToken3, updateOrderStatus);  // Update order status
orderRoutes3.delete("/orders3/:id", verifyToken3, deleteOrder);   // Delete an order

export default orderRoutes3;
