import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config";
import * as configs from "../configs/user.config";

export const generateToken = async (email: string, expiry: string) => {
  try {
    const verificationToken = jwt.sign({ email: email }, JWT_KEY, {
      expiresIn: expiry,
    });
    return verificationToken;
  } catch (err) {
    throw new Error(configs.errors.serverError.key);
  }
};

export const verifyToken = async (verificationToken: string) => {
  try {
    await jwt.verify(verificationToken, JWT_KEY);
  } catch (err) {
    throw new Error(configs.errors.tokenExpired.key);
  }
};
