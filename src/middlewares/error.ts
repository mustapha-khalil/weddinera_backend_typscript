import { NextFunction, Request, Response } from "express";
import HttpError from "../lib/http-error";

const errorMiddleware = (error: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) return next(error);

  return res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred!" });
};

export default errorMiddleware;
