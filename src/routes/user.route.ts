import express from "express";
const router = express.Router();
import checkAuth from "../middlewares/check-auth";

import {
  addHallToFavoites,
  changePassword,
  editUser,
  forgotPassword,
  resetPassword,
  signin,
  signup,
} from "../controllers/user.controller";
import { editValidation, loginValidation, signupValidation } from "../validation/user.validation";

router.post("/signin", loginValidation, signin);
router.post("/signup", signupValidation, signup);
router.patch("/forgot-password", forgotPassword);
router.patch("/reset-password/:id/:token", resetPassword);

router.use(checkAuth);

router.patch("/add-favorite", addHallToFavoites);
router.patch("/change-password", changePassword);
router.patch("/edit", editValidation, editUser);

export default router;
