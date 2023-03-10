import { check } from "express-validator";

export const signupValidation = [
  check("firstName").isString().not().isEmpty(),
  check("lastName").isString().not().isEmpty(),
  check("email").isEmail().normalizeEmail({ gmail_remove_dots: false }).not().isEmpty(),
  check("password").isString().isLength({ min: 7 }).not().isEmpty(),
];

export const loginValidation = [
  check("email").isEmail().normalizeEmail({ gmail_remove_dots: false }),
  check("password").isString().isLength({ min: 6 }),
];

export const editValidation = [
  check("firstName").isString().not().isEmpty(),
  check("lastName").isString().not().isEmpty(),
];
