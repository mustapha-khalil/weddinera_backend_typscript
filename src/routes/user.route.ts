import express from "express";
const router = express.Router();

import { addHallToFavoites, signin, signup } from "../controllers/user.controller";
import checkAuth from "../middlewares/check-auth";
import { loginValidation, signupValidation } from "../validation/user.validation";

router.post("/signin", loginValidation, signin);
router.post("/signup", signupValidation, signup);

router.use(checkAuth);

router.patch("/addFavorite", addHallToFavoites);

export default router;
