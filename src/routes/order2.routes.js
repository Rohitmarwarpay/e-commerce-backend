import express from "express";
import { createOrder, getOrders, getOrder, updateOrderStatus, deleteOrder } from "../controller/order2.controller.js";
import { verifyToken2 } from "../middleware/verifyToken2.js";

const orderRoutes2 = express.Router();

orderRoutes2.post("/orders2", verifyToken2, createOrder);         // Create an order
orderRoutes2.get("/orders2", verifyToken2, getOrders);            // Get all orders
orderRoutes2.get("/orders2/:id", verifyToken2, getOrder);         // Get a specific order
orderRoutes2.put("/orders2/:id/status", verifyToken2, updateOrderStatus);  // Update order status
orderRoutes2.delete("/orders2/:id", verifyToken2, deleteOrder);   // Delete an order

export default orderRoutes2;
