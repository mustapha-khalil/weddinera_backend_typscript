import { Request, Response, NextFunction } from "express";
import promiseHandler from "../lib/promise-handler";
import * as configs from "../configs/hall.config";

import { IHall } from "../models/hall.model";
import { createHallItem, saveHall } from "../services/hall.service";
import { fetchUserById, validateData } from "../services/user.service";

export const createHall = promiseHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    validateData(req);
    const user = await fetchUserById(req);
    const createdHall: IHall = await createHallItem(req);
    await saveHall(user, createdHall);
  },
  configs
);
