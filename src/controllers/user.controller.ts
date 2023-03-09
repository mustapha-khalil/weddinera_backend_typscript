import { NextFunction, Request, Response } from "express";

import {
  areCredentialsValid,
  arePasswordsIdentical,
  createUser,
  doesUserExist,
  fetchUser,
  generateHashedPassword,
  generateUserResponseData,
  saveUser,
  validateData,
} from "../services/user.service";
import { generateToken } from "../lib/token";
import { IUser } from "../models/user.model";
import * as configs from "../configs/user.config";
import * as response from "../lib/response";
import promiseHandler from "../lib/promise-handler";

export const signin = promiseHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  validateData(req);
  const existingUser: IUser = await fetchUser(email);
  await areCredentialsValid(password, existingUser.password);
  const token = await generateToken(existingUser.email, "30d");
  const userResponseData = generateUserResponseData(existingUser, token, "logged in");

  return response.success(res, 200, userResponseData);
}, configs);

export const signup = promiseHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  validateData(req);
  await doesUserExist(email);
  const hashedPassword = await generateHashedPassword(password);
  const createdUser = createUser(req, hashedPassword);
  await saveUser(createdUser);
  const token = await generateToken(email, "30d");
  const userResponseData = generateUserResponseData(createdUser, token, "signed up");

  return response.success(res, 201, userResponseData);
}, configs);
