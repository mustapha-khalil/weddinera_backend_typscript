import bcrypt from "bcryptjs";
import { Request } from "express";
import { validationResult } from "express-validator";

import mongoose, { Types, ObjectId } from "mongoose";
import * as configs from "../configs/user.config";
import { CustomRequest } from "../lib/types";
import sendMail from "../lib/mail-service";
import User, { IUser } from "../models/user.model";
import { IHall } from "../models/hall.model";

export const fetchUserByEmail = async (email: string) => {
  const existingUser: IUser | null = await User.findOne({ email: email })
    .populate("halls")
    .populate("reservations");

  if (!existingUser) throw new Error(configs.errors.notFound.key);
  return existingUser;
};

export const fetchUserById = async (req: Request) => {
  const { id } = req as CustomRequest;
  const user: IUser | null = await User.findById(id);
  if (!user) throw new Error(configs.errors.wrongCredentials.key);
  return user;
};

export const arePasswordsIdentical = (password: string, confirmPassword: string) => {
  if (!password || password !== confirmPassword)
    throw new Error(configs.errors.passwordsNotEqual.key);
};

export const areCredentialsValid = async (receivedPassword: string, actualPassword: string) => {
  const isValidPassword = await bcrypt.compare(receivedPassword, actualPassword);
  if (!isValidPassword) throw new Error(configs.errors.wrongCredentials.key);
};

export const doesUserExist = async (email: string) => {
  const existingUser = await User.findOne({ email: email });
  if (existingUser) throw new Error(configs.errors.userExists.key);
};

export const generateHashedPassword = async (password: string) => {
  return await bcrypt.hash(password, 12);
};

export const createUser = (req: Request, hashedPassword: string) => {
  const createdUser = new User({
    ...req.body,
    password: hashedPassword,
  });

  return createdUser;
};

export const saveUser = async (createdUser: IUser) => {
  await createdUser.save();
};

export const generateUserResponseData = (user: IUser, token: string, message: string) => {
  return {
    message: `logged in with ${user.email}`,
    userInfo: user.toObject({ getters: true }),
    token: token,
  };
};

export const validateData = (req: Request) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new Error(configs.errors.invalidData.key);
};

export const toggleFavoriteHall = (user: IUser, req: Request) => {
  const { hallId } = req.body;
  const index = user.favorites.findIndex((id) => id.toString() === hallId);

  if (index < 0) return user.favorites.push(new mongoose.Types.ObjectId(hallId));
  const newFavorites = user.favorites.filter((id) => id.toString() !== hallId);
  user.favorites = new Types.Array<ObjectId | IHall>(...newFavorites);
};

export const updateUserData = (user: IUser, req: Request) => {
  const { firstName, lastName } = req.body;
  user.firstName = firstName;
  user.lastName = lastName;

  return { firstName, lastName, profileImage: user.profileImage };
};

export const sendPasswordResetEmail = async (user: IUser, token: string) => {
  const url = `webDomain/reset-password/${user._id}/${token}`;
  const subject = "Reset Password";
  const html = `click on the link below to reset your passw0rd <br> <a href="${url}"> Reset Password</a>`;

  await sendMail(user.email, subject, "", html);
};

export const getUserById = async (id: string) => {
  const user: IUser | null = await User.findById(id);
  if (!user) throw new Error(configs.errors.wrongCredentials.key);
  return user;
};

export const compareTokens = (receivedToken: string | null, actualToken: string) => {
  if (receivedToken !== actualToken) throw new Error(configs.errors.invalidToken.key);
};
