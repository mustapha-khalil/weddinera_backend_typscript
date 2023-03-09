import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config";
import * as configs from "../configs/user.config";
import { IUser } from "../models/user.model";

export const generateToken = async (user: IUser, expiry: string) => {
  try {
    const verificationToken = jwt.sign({ user: user }, JWT_KEY, {
      expiresIn: expiry,
    });
    return verificationToken;
  } catch (err) {
    throw new Error(configs.errors.serverError.key);
  }
};

export const verifyToken = async (verificationToken: string) => {
  try {
    const decodedToken = jwt.verify(verificationToken, JWT_KEY);
    return decodedToken;
  } catch (err) {
    throw new Error(configs.errors.tokenExpired.key);
  }
};
