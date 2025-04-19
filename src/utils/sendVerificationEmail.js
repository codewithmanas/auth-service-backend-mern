import dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });
import { transporter } from "../configs/mailHandler.js";
import { FRONTEND_BASE_URL } from "../constant.js";
import jwt from "jsonwebtoken";

if (!process.env.EMAIL_VERIFICATION_SECRET) {
  throw new Error("EMAIL_VERIFICATION_SECRET is not set");
}

export const sendVerificationEmail = async (email, id) => {
  const token = jwt.sign(
    { id: id },
    process.env.EMAIL_VERIFICATION_SECRET,
    { expiresIn: "15m" } // short lifespan for security
  );

  // temporary approach
  const verificationLink = `${FRONTEND_BASE_URL}/verify-email/?token=${token}`;
  // const verificationOTP = "123456";

  const mailOptions = {
    from: '"YourApp" <no-reply@yourapp.com>', // this will be replaced with your email provider "SMTP_USER"
    to: email,
    subject: "Verify your email",
    html: `<p>Click the link to verify your email:</p>
                 <a href="${verificationLink}">Verify Email</a>`,
  };


  // not recommended for production
  try {
    await transporter.verify();
    console.log("SMTP connection successful");

    await transporter.sendMail(mailOptions);

    console.log("Successfully sent verification email");
    return true;

  } catch (error) {
    console.error("SMTP connection failed", error);
    return false;
  }
};
