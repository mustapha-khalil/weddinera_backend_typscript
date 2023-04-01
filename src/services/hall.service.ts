import { Request } from "express";
import mongoose, { Types, ObjectId, isObjectIdOrHexString } from "mongoose";
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

export const doesUserHaveHallInSameLocation = async (user: IUser, req: Request) => {
  const { location } = req.body;
  const halls: Types.Array<ObjectId | IHall> = (await user.populate("halls")).halls;

  for (const hall of halls) {
    if (!("location" in hall)) break;

    const { location: loc } = hall;
    if (loc.lat === location.lat && loc.lng === location.lng)
      throw new Error(configs.errors.hallExists.key);
  }
};

const isValidObjectId = (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error(configs.errors.notFound.key);
};

export const findHallAndUpdate = async (req: Request) => {
  isValidObjectId(req.params.hid);

  const hall = await Hall.findOneAndUpdate(
    { _id: req.params.hid },
    { $set: req.body },
    { new: true }
  );

  if (!hall) throw new Error(configs.errors.notFound.key);
  return hall;
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

  return paginationIndex;
};

export const getHallsByOwnerId = async (req: Request) => {
  const { uid } = req.params;

  const halls = await Hall.find({ ownerId: uid })
    .populate({ path: "reservations" })
    .populate("services")
    .populate("offers");

  return halls.map((hall) => hall.toObject({ getters: true, virtuals: true }));
};

export const fetchHalls = async (paginationIndex: number) => {
  const halls = await Hall.find()
    .populate("offers")
    .populate({ path: "reservations" })
    .populate({ path: "services", select: "name description price" })
    .skip(5 * (paginationIndex - 1))
    .limit(5);

  return halls.map((hall) => hall.toObject({ getters: true, virtuals: true }));
};
