import { Request } from "express";
import mongoose, { Types, ObjectId } from "mongoose";
import { validationResult } from "express-validator";

import { CustomRequest } from "../lib/types";
import * as configs from "../configs/hall.config";
import { IUser } from "../models/user.model";
import Hall, { IHall } from "../models/hall.model";

export const validateData = (req: Request) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new Error(configs.errors.invalidData.key);
};

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
  const halls: Types.Array<ObjectId | IHall> = (await user.populate("halls")).halls;

  for (const hall of halls) {
    if (!("location" in hall)) break;

    const { location: loc } = hall;
    if (loc.lat === location.lat && loc.lng === location.lng)
      throw new Error(configs.errors.hallExists.key);
  }
};

export const generateFilteringQuery = (req: Request) => {
  const { minPrice, maxPrice } = req.query;
  let query = {};

  if (minPrice === undefined || maxPrice === undefined || minPrice === "" || maxPrice === "")
    return query;

  const minPriceNum = Number(minPrice);
  const maxPriceNum = Number(maxPrice);

  if (!isNaN(minPriceNum) && !isNaN(maxPriceNum) && minPriceNum <= maxPriceNum)
    query = { price: { $gte: minPriceNum, $lte: maxPriceNum } };

  return query;
};

export const getPaginationIndex = (req: Request) => {
  const { pagination } = req.query;

  let paginationIndex = 1;
  if (pagination === undefined) return paginationIndex;

  paginationIndex = Number(pagination);
  if (!isNaN(paginationIndex)) return paginationIndex;

  return 1;
};

export const fetchHalls = async (paginationIndex: number) => {
  const halls = await Hall.find()
    .populate("reservations")
    .populate("services")
    .populate("offers")
    .skip(20 * (paginationIndex - 1))
    .limit(20);

  return halls;
};
