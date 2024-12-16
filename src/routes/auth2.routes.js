import express from "express";
import { registerUser, logInUser, logoutUser } from "../controller/auth2.controller.js";

const authRoutes2 = express.Router();

authRoutes2.use(express.urlencoded({ extended: true }));
authRoutes2.use(express.json());

authRoutes2.post("/signUp2", registerUser);
authRoutes2.post("/logIn2", logInUser);
authRoutes2.post("/logOut2", logoutUser);

export default authRoutes2;
