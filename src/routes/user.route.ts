import express from "express";
const router = express.Router();

import { addHallToFavoites, changePassword, signin, signup } from "../controllers/user.controller";
import checkAuth from "../middlewares/check-auth";
import { loginValidation, signupValidation } from "../validation/user.validation";

router.post("/signin", loginValidation, signin);
router.post("/signup", signupValidation, signup);

router.use(checkAuth);

router.patch("/addFavorite", addHallToFavoites);
router.patch("/changePassword", changePassword);

export default router;
