import express from "express";
import { createOrder, getOrders, getOrder, updateOrderStatus, deleteOrder } from "../controller/order2.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const orderRoutes2 = express.Router();

orderRoutes2.post("/orders2", verifyToken, createOrder);         // Create an order
orderRoutes2.get("/orders2", verifyToken, getOrders);            // Get all orders
orderRoutes2.get("/orders2/:id", verifyToken, getOrder);         // Get a specific order
orderRoutes2.put("/orders2/:id/status", verifyToken, updateOrderStatus);  // Update order status
orderRoutes2.delete("/orders2/:id", verifyToken, deleteOrder);   // Delete an order

export default orderRoutes2;
