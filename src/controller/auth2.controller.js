import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Validator } from "../helper/Validator.js";
import User from "../models/User2.model.js"; // Assuming you're importing the User model
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

export const registerUser = async (req, res) => {
  try {
    // Destructure data from request body
    const { firstName, lastName, email, password } = req.body;

    // Validate input data
    const validator = new Validator();
    const { getUser, inputValidation } = validator;
    const { isInputValid, msg: inputValidationMsg } = inputValidation({
      firstName,
      lastName,
      email,
      password,
    });

    if (!isInputValid) {
      return res.status(400).json({ msg: inputValidationMsg });
    }

    // Check if the user already exists
    const { isNewUserEntry, msg } = await getUser(email, { attempt: "signUp" });
    if (!isNewUserEntry) {
      return res.status(400).json({ msg });
    }

    // Hash the user password
    const hashPassword = await bcrypt.hash(password, 10);

    // Save the user data into the database
    const userData = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    // Generate tokens using the schema methods
    const accessToken = userData.createAccessToken();
    const refreshToken = userData.createRefreshToken();

    userData.password = undefined; // Don't send the password back to the client

    // Store the refresh token securely in HTTP-only cookies
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, // Set true in production for HTTPS
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true, // Set true in production for HTTPS
      sameSite: "Strict",
      maxAge: 2 * 24 * 60 * 60 * 1000, // 1 hour
    });

    // Respond with the access token
    res.status(200).json({
      accessToken,
      message: "You have successfully registered!",
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ msg: "Registration failed", error: error.message });
  }
};

export const logInUser = async (req, res) => {
  try {
    // Destructure data from request body
    const { email, password } = req.body;

    // Validate input data
    const validator = new Validator();
    const { inputValidation, getUser } = validator;
    const { isInputValid, msg: inputValidationMessage } = inputValidation({
      email,
      password,
    });

    if (!isInputValid) {
      return res.status(400).json({ msg: inputValidationMessage });
    }

    // Check if the user exists
    const { userData, isNewUserEntry, msg } = await getUser(email, {
      attempt: "logIn",
    });

    if (isNewUserEntry) {
      return res.status(400).json({ msg });
    }

    // Compare database password with input password
    const isPasswordValid = await bcrypt.compare(password, userData.password);

    if (!isPasswordValid) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    const accessToken = userData.createAccessToken();
    const refreshToken = userData.createRefreshToken();

    // Set token options for cookies
    const options1 = {
      httpOnly: true,
      secure: true, // Ensure this is true in production (requires HTTPS)
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    const options2 = {
      httpOnly: true,
      secure: true, // Ensure this is true in production (requires HTTPS)
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    };

    userData.password = undefined; // Don't send the password back to the client

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, options1)
      .cookie("accessToken", accessToken, options2)
      .json({
        userData,
        msg: "You have logged in successfully",
        accessToken,
      });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ msg: "Login failed", error: error.message });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });

  res.status(200).json({ message: "You have successfully logged out!" });
};
