import { NextFunction, Request, Response } from "express";
import {
  areCredentialsValid,
  arePasswordsIdentical,
  createUser,
  doesUserExist,
  fetchUserByEmail,
  fetchUserById,
  generateHashedPassword,
  generateUserResponseData,
  saveUser,
  toggleFavoriteHall,
  validateData,
} from "../services/user.service";
import { generateToken } from "../lib/token";
import { CustomRequest } from "../lib/types";
import User, { IUser } from "../models/user.model";
import promiseHandler from "../lib/promise-handler";
import * as response from "../lib/response";
import * as configs from "../configs/user.config";

export const signin = promiseHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  validateData(req);
  const existingUser: IUser = await fetchUserByEmail(email);
  await areCredentialsValid(password, existingUser.password);
  const token = await generateToken(existingUser, "30d");
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
  const token = await generateToken(createdUser, "30d");
  const userResponseData = generateUserResponseData(createdUser, token, "signed up");

  return response.success(res, 201, userResponseData);
}, configs);

export const addHallToFavoites = promiseHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await fetchUserById(req);
    toggleFavoriteHall(user, req);
    await saveUser(user);

    response.success(res, 201);
  },
  configs
);

export const changePassword = promiseHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const user = await fetchUserById(req);
    await areCredentialsValid(currentPassword, user.password);
    arePasswordsIdentical(newPassword, confirmPassword);
    const password = await generateHashedPassword(newPassword);
    user.password = password;
    saveUser(user);

    response.success(res, 201);
  },
  configs
);
