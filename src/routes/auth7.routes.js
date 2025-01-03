import express from "express";
import { logInUser, logoutUser, registerUser } from "../controller/auth7.controller.js";

const authRoutes7 = express.Router();

authRoutes7.use(express.urlencoded({ extended: true }));
authRoutes7.use(express.json());

authRoutes7.post("/signUp7", registerUser);
authRoutes7.post("/logIn7", logInUser);
authRoutes7.post("/logOut7", logoutUser);

export default authRoutes7;
