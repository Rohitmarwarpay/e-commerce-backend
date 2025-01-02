import express from "express";
import { logInUser, logoutUser, registerUser } from "../controller/auth5.controller.js";

const authRoutes5 = express.Router();

authRoutes5.use(express.urlencoded({ extended: true }));
authRoutes5.use(express.json());

authRoutes5.post("/signUp5", registerUser);
authRoutes5.post("/logIn5", logInUser);
authRoutes5.post("/logOut5", logoutUser);

export default authRoutes5;
