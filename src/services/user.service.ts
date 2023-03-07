import bcrypt from "bcryptjs";

import User, { IUser } from "../models/user.model";
import * as configs from "../configs/user.config";

export const fetchUser = async (email: string) => {
  try {
    const existingUser: IUser | null = await User.findOne({ email: email })
      .populate("reservation")
      .populate({
        path: "hallId",
        populate: {
          path: "bookings",
          model: "Booking",
        },
      });
    if (!existingUser) throw new Error(configs.errors.notFound.key);
    return existingUser;
  } catch (err) {
    console.log("err", err);
    throw new Error(configs.errors.serverError.key);
  }
};

export const arePasswordsIdentical = async (receivedPassword: string, actualPassword: string) => {
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(receivedPassword, actualPassword);
  } catch (err) {
    console.log("error", err);
    throw new Error(configs.errors.passwordsNotEqual.key);
  }

  if (!isValidPassword) throw new Error(configs.errors.passwordsNotEqual.key);
};
