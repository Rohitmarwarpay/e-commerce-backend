import express from "express";
import { createOrder, deleteOrder, getOrder, getOrders, updateOrderStatus } from "../controller/order7.controller.js";
import { verifyToken7 } from './../middleware/verifyToken7.js';

const orderRoutes7 = express.Router();

orderRoutes7.post("/orders7", verifyToken7, createOrder);         // Create an order
orderRoutes7.get("/orders7", verifyToken7, getOrders);            // Get all orders
orderRoutes7.get("/orders7/:id", verifyToken7, getOrder);         // Get a specific order
orderRoutes7.put("/orders7/:id/status", verifyToken7, updateOrderStatus);  // Update order status
orderRoutes7.delete("/orders7/:id", verifyToken7, deleteOrder);   // Delete an order

export default orderRoutes7;
