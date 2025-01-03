import express from "express";
import { registerUser, logInUser, logoutUser } from "../controller/auth3.controller.js";

const authRoutes3 = express.Router();

authRoutes3.use(express.urlencoded({ extended: true }));
authRoutes3.use(express.json());

authRoutes3.post("/signUp3", registerUser);
authRoutes3.post("/logIn3", logInUser);
authRoutes3.post("/logOut3", logoutUser);

export default authRoutes3;
