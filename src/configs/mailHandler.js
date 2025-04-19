import dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });
import nodemailer from "nodemailer";

if (!process.env.EMAIL_USER) {
  throw new Error("EMAIL_USER is not set");
}

if (!process.env.EMAIL_PASS) {
  throw new Error("EMAIL_PASS is not set");
}

// This is for sending emails in development
// not recommended for production
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
