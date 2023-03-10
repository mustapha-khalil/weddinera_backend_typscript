import { check } from "express-validator";

export const createHallValidation = [
  check("hallName").isString().not().isEmpty(),
  check("mobileNumber").isString().not().isEmpty(),
  check("address").isString().not().isEmpty(),
  check("location").isObject().not().isEmpty(),
];
