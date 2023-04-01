import { Request, Response, NextFunction } from "express";
import errorHandler from "./error-handler";
import { WrapperCallback } from "./types";

const promiseHandler =
  (controller: WrapperCallback, configs: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error: any) {
      console.log("error", error);
      errorHandler(configs.errors, error, next);
    }
  };

export default promiseHandler;
