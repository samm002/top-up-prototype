import dotenv from "dotenv";
dotenv.config();

export const PORT: number = parseInt(process.env.PORT || '3000');
export const DATABASE_URL: string = process.env.DATABASE_URL || "";
export const XENDIT_API_KEY: string = process.env.XENDIT_API_KEY || "";
export const VIPAYMENT_KEY: string = process.env.VIPAYMENT_KEY || "";
export const VIPAYMENT_SIGN: string = process.env.VIPAYMENT_SIGN || "";