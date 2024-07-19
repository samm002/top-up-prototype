import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL as string;

const connect = async () => {
  try {
    await mongoose.connect(DATABASE_URL, {
      autoIndex: true,
      dbName: "prototype-topup",
      connectTimeoutMS: 10000,
    });
    console.log("Database connected");
  } catch (error) {
    console.log(error);
    console.log("Error connecting to database");
  }
};

export default connect;
