import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Method to create an access token
userSchema.methods.createAccessToken = function () {
  return jwt.sign(
    { id: this._id, email: this.email },
    process.env.SECRET_KEY,
    { expiresIn: "1d" } // Short-lived
  );
};

// Method to create a refresh token
userSchema.methods.createRefreshToken = function () {
  return jwt.sign(
    { id: this._id, email: this.email },
    process.env.REFRESH_SECRET_KEY,
    { expiresIn: "7d" } // Long-lived
  );
};

// Method to verify and refresh tokens
userSchema.statics.refreshAccessToken = function (refreshToken) {
  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
    // If valid, return a new access token
    return jwt.sign(
      { id: decoded.id, email: decoded.email },
      process.env.SECRET_KEY,
      { expiresIn: "15m" }
    );
  } catch (err) {
    throw new Error("Invalid or expired refresh token");
  }
};

const User = mongoose.model("User4", userSchema);

export default User;
