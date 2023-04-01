import { Request, Response, NextFunction } from "express";
import promiseHandler from "../lib/promise-handler";
import * as configs from "../configs/hall.config";
import * as response from "../lib/response";

import { IHall } from "../models/hall.model";
import {
  createHallItem,
  doesUserHaveHallInSameLocation,
  fetchHalls,
  findHallAndUpdate,
  generateFilteringQuery,
  getHallsByOwnerId,
  getPaginationIndex,
  saveHall,
  validateData,
} from "../services/hall.service";
import { fetchUserById } from "../services/user.service";

export const getHalls = promiseHandler(async (req: Request, res: Response, next: NextFunction) => {
  const paginationIndex = getPaginationIndex(req);
  const halls = await fetchHalls(paginationIndex);

  response.success(res, 200, halls);
}, configs);

export const getUserHalls = promiseHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const halls = await getHallsByOwnerId(req);
    response.success(res, 200, halls);
  },
  configs
);

export const createHall = promiseHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    validateData(req);

    const user = await fetchUserById(req);
    await doesUserHaveHallInSameLocation(user, req);
    const createdHall: IHall = await createHallItem(req);
    await saveHall(user, createdHall);

    response.success(res, 201, { hall: createdHall.toObject({ getters: true }) });
  },
  configs
);

export const updateHall = promiseHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const hall = await findHallAndUpdate(req);

    response.success(res, 201, hall);
  },
  configs
);
