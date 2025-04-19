import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { transporter } from "../configs/mailHandler.js";
dotenv.config({ path: "./.env.local" });

if(!process.env.SMTP_HOST) {
    throw new Error("SMTP_HOST is not set");
}

if(!process.env.SMTP_USER) {
    throw new Error("SMTP_USER is not set");
}


export const sendVerificationEmail = async (email, id) => {

        const  verificationLink = `http://localhost:8001/verify-otp/?userid=${id}`;
        const verificationOTP = "123456";

        // const mailOptions = {
        //     from: process.env.SMTP_USER,
        //     to: email,
        //     subject: "Email Verification",
        //     text: `Please click the link to verify your email: http://localhost:8001/verify/${id}`,
        // }
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: "Complete your registration",
            // text: "Welcome to SkillEx",
            // html: "<p>Your email address has been registered with SkillEx. To validate your account, please complete your profile by clicking the link below:</p><p><a href='http://localhost:5173/verify-otp/?userid=${id}'>Verify Email</a></p>",
            html: `"Welcome to SkillEx" <p> Please, verify using OTP: ${verificationOTP}</p>`
          };




        try {
            await transporter.verify();
            console.log('SMTP connection successful');
          } catch (error) {
            console.error('SMTP connection failed', error);
          }

    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error sending email: ", error);
            } else {
                console.log("Email sent: ", info.response);
            }
        });

        return true;
}