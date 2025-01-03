import express from "express";
import { createOrder, deleteOrder, getOrder, getOrders, updateOrderStatus } from "../controller/order4.controller.js";
import { verifyToken4 } from "../middleware/verifyToken4.js";

const orderRoutes4 = express.Router();

orderRoutes4.post("/orders4", verifyToken4, createOrder);         // Create an order
orderRoutes4.get("/orders4", verifyToken4, getOrders);            // Get all orders
orderRoutes4.get("/orders4/:id", verifyToken4, getOrder);         // Get a specific order
orderRoutes4.put("/orders4/:id/status", verifyToken4, updateOrderStatus);  // Update order status
orderRoutes4.delete("/orders4/:id", verifyToken4, deleteOrder);   // Delete an order

export default orderRoutes4;
