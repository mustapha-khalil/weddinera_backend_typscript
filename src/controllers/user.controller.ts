import { NextFunction, Request, Response } from "express";
import {
  areCredentialsValid,
  arePasswordsIdentical,
  compareTokens,
  createUser,
  doesUserExist,
  fetchUserByEmail,
  fetchUserById,
  generateHashedPassword,
  generateUserResponseData,
  getUserById,
  saveUser,
  sendPasswordResetEmail,
  toggleFavoriteHall,
  updateUserData,
  validateData,
} from "../services/user.service";
import { generateToken, verifyToken } from "../lib/token";
import { CustomRequest } from "../lib/types";
import User, { IUser } from "../models/user.model";
import promiseHandler from "../lib/promise-handler";
import * as response from "../lib/response";
import * as configs from "../configs/user.config";
import sendMail from "../lib/mail-service";
import { PASSWORD_RESET_TOKEN_EXPIRY } from "../config";

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

    response.success(res, 200);
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

    response.success(res, 200);
  },
  configs
);

export const editUser = promiseHandler(async (req: Request, res: Response, next: NextFunction) => {
  validateData(req);
  const user = await fetchUserById(req);
  const updatedData = updateUserData(user, req);
  await saveUser(user);

  response.success(res, 200, { user: updatedData });
}, configs);

export const forgotPassword = promiseHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await fetchUserById(req);

    user.passwordResetToken = null;
    const passwordResetToken = await generateToken(user, PASSWORD_RESET_TOKEN_EXPIRY + "m");
    user.passwordResetToken = passwordResetToken;
    await saveUser(user);
    await sendPasswordResetEmail(user, user.passwordResetToken);

    response.success(res, 200);
  },
  configs
);

export const resetPassword = promiseHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id, token } = req.params;
    const { newPassword, confirmPassword } = req.body;

    const user = await getUserById(id);
    compareTokens(user.passwordResetToken, token);
    await verifyToken(token);
    arePasswordsIdentical(newPassword, confirmPassword);
    const password = await generateHashedPassword(newPassword);
    user.password = password;
    await saveUser(user);
    response.success(res, 200);
  },
  configs
);
