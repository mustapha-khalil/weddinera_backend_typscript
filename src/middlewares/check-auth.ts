import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../lib/token";
import * as configs from "../configs/user.config";
import promiseHandler from "../lib/promise-handler";
import { JwtPayload } from "jsonwebtoken";

const checkAuth = promiseHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Authorization: "Bearer TOKEN"
    if (!token) throw new Error(configs.errors.invalidToken.key);
    const decodedToken: JwtPayload | string = await verifyToken(token);
    (req as any).id = (decodedToken as any).user._id;
    next();
  } catch (err) {
    throw new Error(configs.errors.invalidToken.key);
  }
}, configs);

export default checkAuth;
