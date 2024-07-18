import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
    status: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentChannel: {
      type: String,
      required: true,
    },
    paymentTime: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const TransactionModel = mongoose.model("Transaction", TransactionSchema);

export default TransactionModel;
