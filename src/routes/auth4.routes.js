import express from "express";
import { registerUser, logInUser, logoutUser } from "../controller/auth4.controller.js";

const authRoutes4 = express.Router();

authRoutes4.use(express.urlencoded({ extended: true }));
authRoutes4.use(express.json());

authRoutes4.post("/signUp4", registerUser);
authRoutes4.post("/logIn4", logInUser);
authRoutes4.post("/logOut4", logoutUser);

export default authRoutes4;
