import { Request, Response, NextFunction } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  return next(new Error("Could not find this route"));
};

export default notFound;
