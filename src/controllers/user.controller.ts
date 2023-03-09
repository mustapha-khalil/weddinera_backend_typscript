import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

import {
  areCredentialsValid,
  arePasswordsIdentical,
  createUser,
  doesUserExist,
  fetchUser,
  generateHashedPassword,
  generateUserResponseData,
  saveUser,
} from "../services/user.service";
import { generateToken } from "../lib/token";
import { IUser } from "../models/user.model";
import * as configs from "../configs/user.config";
import promiseHandler from "../lib/promise-handler";
import * as response from "../lib/response";

export const signin = promiseHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const existingUser: IUser = await fetchUser(email);
  await areCredentialsValid(password, existingUser.password);
  const token = await generateToken(existingUser.email, "30d");
  const userResponseData = generateUserResponseData(existingUser, token, "logged in");

  return response.success(res, 200, userResponseData);
}, configs);

export const signup = promiseHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  await doesUserExist(email);
  const hashedPassword = await generateHashedPassword(password);
  const createdUser = createUser(req, hashedPassword);
  await saveUser(createdUser);
  const token = await generateToken(email, "30d");
  const userResponseData = generateUserResponseData(createdUser, token, "signed up");

  return response.success(res, 201, userResponseData);
}, configs);
