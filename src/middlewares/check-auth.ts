import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as configs from "../configs/user.config";

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Authorization: "Bearer TOKEN"
    if (!token) {
      throw new Error(configs.errors.invalidToken.key);
    }
    const decodedToken = jwt.verify(token, "super_secret_dont_share");
    // req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new Error(configs.errors.invalidToken.key);
    return next(error);
  }
};

export default checkAuth;
