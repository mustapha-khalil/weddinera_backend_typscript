import { NextFunction, Request, Response } from "express";
import HttpError from "../lib/http-error";

const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) return next(error);

  if (error instanceof HttpError)
    return res
      .status(error.code || 500)
      .json({ message: error.message || "An unknown error occurred!" });

  res.status(500).json({ message: "Something went wrong, please try again" });
};

export default errorMiddleware;
