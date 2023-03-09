import { Response } from "express";

export const success = (res: Response, status: number = 200, data: any = undefined) => {
  const response = {
    data,
    status,
    success: true,
  };
  return res.status(response.status).json(response);
};
