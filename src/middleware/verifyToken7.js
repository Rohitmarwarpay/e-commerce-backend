import jwt from "jsonwebtoken";
import User from "../models/User7.model.js";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

export const verifyToken7 = async (req, res, next) => {
  const token = req.headers["authorization"];
  const refreshToken = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token.split(' ')[1], process.env.SECRET_KEY, async (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError" && refreshToken) {
        try {
          // Automatically refresh the access token
          const newAccessToken = User.refreshAccessToken(refreshToken);
          res.setHeader("Authorization", `Bearer ${newAccessToken}`);
          req.user = jwt.verify(newAccessToken, process.env.SECRET_KEY); // Decode the new token
          return next(); // Proceed with the request
        } catch (error) {
          return res.status(403).json({ message: "Refresh token invalid or expired" });
        }
      }
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = decoded; // Set the user in the request object
    next();
  });
};