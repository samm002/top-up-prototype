import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      unique: true,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "not available"],
      default: "available",
      required: "false",
    }
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model("Product", ProductSchema);

export default ProductModel;
