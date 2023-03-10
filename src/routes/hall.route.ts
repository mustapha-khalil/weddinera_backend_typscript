import express from "express";
import checkAuth from "../middlewares/check-auth";
import { createHall } from "../controllers/hall.controller";
import { createHallValidation } from "../validation/hall.validation";

const router = express.Router();

router.use(checkAuth);

router.post("/createHall", createHallValidation, createHall);

export default router;
