import express from "express";
const router = express.Router();

import { signin, signup } from "../controllers/user.controller";
import { loginValidation, signupValidation } from "../validation/user.validation";

router.post("/signin", loginValidation, signin);
router.post("/signup", signupValidation, signup);

export default router;
