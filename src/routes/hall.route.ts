import express from "express";
import checkAuth from "../middlewares/check-auth";
import { createHall, getHalls, getUserHalls } from "../controllers/hall.controller";
import { createHallValidation } from "../validation/hall.validation";

const router = express.Router();

router.get("/", getHalls);

router.use(checkAuth);

router.get("/:uid", getUserHalls);
router.post("/", createHallValidation, createHall);

export default router;
