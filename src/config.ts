import * as dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export const { JWT_KEY, MONGO_URI } = process.env;

export const connectDB = (url: string) => {
  return mongoose.connect(url);
};
