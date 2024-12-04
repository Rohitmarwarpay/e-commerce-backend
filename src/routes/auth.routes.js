import express from "express";
import { registerUser, logInUser, logoutUser } from "../controller/auth.controller.js";

const authRoutes = express.Router();

authRoutes.use(express.urlencoded({ extended: true }));
authRoutes.use(express.json());

authRoutes.post("/signUp", registerUser);
authRoutes.post("/logIn", logInUser);
authRoutes.post("/logOut", logoutUser);

export default authRoutes;
