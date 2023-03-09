import { NextFunction, Request, Response } from "express";

export type ErrorProp = {
  key: string;
  code: number;
  message: {
    en: string;
  };
};

export type Errors = {
  [key: string]: ErrorProp;
};

export type CustomRequest = Request & { id: string };

export type WrapperCallback = (req: Request, res: Response, next: NextFunction) => any;
