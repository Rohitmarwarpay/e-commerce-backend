import express from "express";
import { logInUser, logoutUser, registerUser } from "../controller/auth6.controller.js";

const authRoutes6 = express.Router();

authRoutes6.use(express.urlencoded({ extended: true }));
authRoutes6.use(express.json());

authRoutes6.post("/signUp6", registerUser);
authRoutes6.post("/logIn6", logInUser);
authRoutes6.post("/logOut6", logoutUser);

export default authRoutes6;
