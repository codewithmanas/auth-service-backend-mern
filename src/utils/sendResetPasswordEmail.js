
import jwt from "jsonwebtoken";
import { FRONTEND_BASE_URL } from "../constant.js";
import { transporter } from "../configs/mailHandler.js";

if(!process.env.PASSWORD_RESET_SECRET) {
    throw new Error("PASSWORD_RESET_SECRET is not set");
}

export const sendResetPasswordEmail = async (email, id) => {
  const token = jwt.sign(
    { id: id },
    process.env.PASSWORD_RESET_SECRET,
    { expiresIn: "15m" } // short lifespan for security
  );

  // temporary approach
  const resetURL = `${FRONTEND_BASE_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: '"YourApp" <no-reply@yourapp.com>', // this will be replaced with your email provider "SMTP_USER"
    to: email,
    subject: "Password Reset",
    html: `<p>Click <a href="${resetURL}">here</a> to reset your password. This link will expire in 15 minutes.</p>`
  };


  // not recommended for production
  try {
    await transporter.verify();
    console.log("SMTP connection successful");

    await transporter.sendMail(mailOptions);

    console.log("Successfully sent reset password email");
    return true;

  } catch (error) {
    console.error("SMTP connection failed", error);
    return false;
  }
};