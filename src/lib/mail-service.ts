import nodemailer from "nodemailer";

import { EMAIL, EMAIL_PASS, EMAIL_SERVICE } from "../config";
import * as configs from "../configs/user.config";
import HttpError from "./http-error";

const transporter = nodemailer.createTransport({
  service: EMAIL_SERVICE,
  auth: {
    user: EMAIL,
    pass: EMAIL_PASS,
  },
});

const sendMail = async (identity: string, subject: string, text: string = "", html?: string) => {
  const options = {
    from: EMAIL,
    to: identity,
    subject: subject,
    text: text,
    html: html,
  };

  transporter.sendMail(options, (err: any) => {
    if (err) console.log("err", err);
  });
};

export default sendMail;
