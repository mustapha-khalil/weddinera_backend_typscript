import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../lib/token";
import * as configs from "../configs/user.config";

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Authorization: "Bearer TOKEN"
    if (!token) throw new Error(configs.errors.invalidToken.key);

    const decodedToken = await verifyToken(token);
    (req as any).id = decodedToken.user._id;
    next();
  } catch (err) {
    const error = new Error(configs.errors.invalidToken.key);
    return next(error);
  }
};

export default checkAuth;
