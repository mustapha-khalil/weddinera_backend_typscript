import bcrypt from "bcryptjs";
import { Request } from "express";

import { Types } from "mongoose";
import User, { IUser } from "../models/user.model";
import * as configs from "../configs/user.config";

export const fetchUser = async (email: string) => {
  try {
    const existingUser: IUser | null = await User.findOne({ email: email });
    // .populate("reservation");
    // .populate({
    //   path: "hallId",
    //   populate: {
    //     path: "bookings",
    //     model: "Booking",
    //   },
    // });
    if (!existingUser) throw new Error(configs.errors.notFound.key);
    return existingUser;
  } catch (err) {
    console.log("err", err);
    throw new Error(configs.errors.serverError.key);
  }
};

export const arePasswordsIdentical = async (password: string, confirmPassword: string) => {
  if (password !== confirmPassword) throw new Error(configs.errors.passwordsNotEqual.key);
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
    favorites: [],
    hallId: null,
    reservation: null,
    chatRooms: [],
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
    hallInfo:
      user.hallId instanceof Types.ObjectId
        ? user.hallId
        : user.hallId?.toObject({ getters: true }),
    token: token,
  };
};
