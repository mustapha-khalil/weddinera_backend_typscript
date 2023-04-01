import * as dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export const { JWT_KEY, MONGO_URI, EMAIL, EMAIL_PASS, EMAIL_SERVICE, PASSWORD_RESET_TOKEN_EXPIRY } =
  process.env;

export const connectDB = (url: string) => mongoose.connect(url);
