import { NextFunction } from "express";
import HttpError from "./http-error";
import { Errors } from "./types";

const errorHandler = (errors: Errors, error: Error, next: NextFunction) => {
  Object.values(errors).filter((err) => {
    if (err.key === error.message) return next(new HttpError(err.message.en, err.code));
  });
  return next(error);
};

export default errorHandler;
