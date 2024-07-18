import { Types } from "mongoose";

interface productInterface {
  _id: Types.ObjectId;
  category: string;
  service: string;
  total: number;
  price: number;
  status: "available" | "not available";
  createdAt: Date;
  updatedAt: Date;
}

interface orderInterface {
  _id: Types.ObjectId;
  transactionId?: string;
  gameId: string;
  status: "pending" | "completed" | "cancelled";
  product: productInterface | Types.ObjectId | null; // Product or ObjectId or null
  createdAt: Date;
  updatedAt: Date;
}

interface TopUpResponseDetailInterface {
  trxid: string;
  data: string;
  zone: string;
  service: string;
  status: string;
  note: string;
  balance: number;
  price: number;
}

interface TopUpResponseInterface {
  result: boolean;
  data: TopUpResponseDetailInterface;
  message: string;
}

export {
  productInterface,
  orderInterface,
  TopUpResponseInterface,
}






