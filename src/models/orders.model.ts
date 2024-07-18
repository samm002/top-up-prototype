import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    transactionId: {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
    },
    vipaymentId: {
      type: String,
      required: false,
    },
    gameId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("Order", OrderSchema);

export default OrderModel;
