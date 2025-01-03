import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be a positive value"],
    },
    actualPrice: {
      type: Number,
      min: [0, "Price must be a positive value"],
      default:0,
    },
    size: {
      type: String, // Single size, not an array
      enum: ["S", "M", "L", "XL", "XXL"], // Restrict values to these options
      default: "M", // Default size
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

const Product = mongoose.model("Product4", productSchema);

export default Product;