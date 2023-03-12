import express from "express";
import checkAuth from "../middlewares/check-auth";

const router = express.Router();

router.use(checkAuth);

export default router;
