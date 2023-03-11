import { Request } from "express";
import mongoose, { Types } from "mongoose";
import { CustomRequest } from "../lib/types";
import Hall, { IHall } from "../models/hall.model";
import { IUser } from "../models/user.model";
import * as configs from "../configs/hall.config";

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
  user.halls.push(createdHall);
  await user.save({ session: sess });
  await sess.commitTransaction();
};

export const doesHallExist = async (user: IUser, req: Request) => {
  const { location } = req.body;
  const halls: Types.Array<Types.ObjectId | IHall> = (await user.populate("halls")).halls;

  for (const hall of halls) {
    if (!("location" in hall)) break;

    const { location: loc } = hall;
    if (loc.lat === location.lat && loc.lng === location.lng)
      throw new Error(configs.errors.hallExists.key);
  }
};
