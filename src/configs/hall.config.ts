import { Errors } from "../lib/types";

export const errors: Errors = {
  serverError: {
    key: "ServerError",
    code: 500,
    message: { en: "Something went wrong, please try again" },
  },
  notFound: {
    key: "NotFound",
    code: 404,
    message: { en: "Hall does not exist" },
  },
  tokenExpired: {
    key: "TokenExpired",
    code: 400,
    message: { en: "Your token has expired" },
  },
  invalidToken: {
    key: "InvalidToken",
    code: 400,
    message: { en: "Your token is invalid" },
  },
  invalidData: {
    key: "InvalidData",
    code: 422,
    message: {
      en: "Invalid inputs passed, please check your data",
    },
  },
  tokenRedeemed: {
    key: "TokenRedeemed",
    code: 400,
    message: { en: "Your token has already been redeemed" },
  },
  emailFailed: {
    key: "EmailFailed",
    code: 500,
    message: { en: "Failed to send email" },
  },
  wrongCredentials: {
    key: "WrongCredentials",
    code: 400,
    message: { en: "Invalid Credentials" },
  },
};
