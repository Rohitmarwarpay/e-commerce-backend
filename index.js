import express from "express";
import cors from "cors";
import { DBConnection } from "./src/db.js";
import authRoutes from "./src/routes/auth.routes.js";
import productRoutes from "./src/routes/product.routes.js"; // Assuming you have the product routes file
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import orderRoutes from "./src/routes/order.routes.js";
import authRoutes2 from "./src/routes/auth2.routes.js";
import productRoutes2 from "./src/routes/product2.routes.js";
import orderRoutes2 from "./src/routes/order2.routes.js";
import authRoutes5 from "./src/routes/auth5.routes.js";
import productRoutes5 from "./src/routes/product5.routes.js";
import orderRoutes5 from "./src/routes/order5.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);

app.use("/api/auth2", authRoutes2);
app.use("/api/product2", productRoutes2);
app.use("/api/order2", orderRoutes2);

app.use("/api/auth5", authRoutes5);
app.use("/api/product5", productRoutes5);
app.use("/api/order5", orderRoutes5);

DBConnection();

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
