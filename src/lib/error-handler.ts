import { NextFunction } from "express";
import { Errors } from "./types";
import HttpError from "./http-error";

const errorHandler = (errors: Errors, error: Error, next: NextFunction) => {
  Object.values(errors).filter((err) => {
    if (err.key === error.message) return next(new HttpError(err.message.en, err.code));
  });
  return next(error);
};

export default errorHandler;
