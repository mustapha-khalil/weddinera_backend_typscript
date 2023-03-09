import * as dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export const JWT_KEY: string | undefined = process.env.JWT_KEY;
export const MONGO_URI: string | undefined = process.env.MONGO_URI;

export const connectDB = (url: string) => {
  return mongoose.connect(url);
};
