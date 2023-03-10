import { Request } from "express";
import mongoose from "mongoose";
import { CustomRequest } from "../lib/types";
import Hall, { IHall } from "../models/hall.model";
import { IUser } from "../models/user.model";

export const createHallItem = async (req: Request) => {
  const { id: userId } = req as CustomRequest;

  const createdHall = new Hall({
    ...req.body,
    ownerId: userId,
  });

  return createdHall;
};

export const saveHall = async (user: IUser, createdHall: IHall) => {
  const sess = await mongoose.startSession();
  sess.startTransaction();
  await createdHall.save({ session: sess });
  user.hallId = createdHall;
  await user.save({ session: sess });
  await sess.commitTransaction();
};
