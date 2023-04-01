import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config";
import { IUser } from "../models/user.model";
import * as configs from "../configs/user.config";

export const generateToken = async (user: IUser, expiry: string) => {
  try {
    const verificationToken = jwt.sign({ user: user }, JWT_KEY as string, {
      expiresIn: expiry,
    });
    return verificationToken;
  } catch (err) {
    throw new Error(configs.errors.serverError.key);
  }
};

export const verifyToken = async (verificationToken: string) => {
  return jwt.verify(verificationToken, JWT_KEY as string);
};
