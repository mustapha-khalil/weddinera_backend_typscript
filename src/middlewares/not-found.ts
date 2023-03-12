import { Request, Response, NextFunction } from "express";
import HttpError from "../lib/http-error";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  return next(new HttpError("Could not find this route", 404));
};

export default notFound;
