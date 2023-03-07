import { NextFunction, Request, Response } from "express";

import { arePasswordsIdentical, fetchUser } from "../services/user.service";
import promiseHandler from "../lib/promise-handler";
import * as configs from "../configs/user.config";
import { generateToken } from "../lib/token";
import { IUser } from "../models/user.model";
import { Types } from "mongoose";

export const login = promiseHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const existingUser: IUser = await fetchUser(email);
  await arePasswordsIdentical(password, existingUser.password);
  const token = await generateToken(existingUser.email, "30d");

  res.status(200).json({
    message: `logged in with ${email}`,
    userInfo: existingUser.toObject({ getters: true }),
    hallInfo:
      existingUser.hallId instanceof Types.ObjectId
        ? existingUser.hallId
        : existingUser.hallId?.toObject({ getters: true }),
    token: token,
  });
}, configs);
