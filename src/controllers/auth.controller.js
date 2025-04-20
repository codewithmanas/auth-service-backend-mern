import { User } from "../models/user.model.js";
import { createUser, findUserByEmail } from "../services/auth.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { comparePassword } from "../utils/comparePassword.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateAccessAndRefreshToken.js";
import { hashPassword } from "../utils/hashPassword.js";
import { sendResetPasswordEmail } from "../utils/sendResetPasswordEmail.js";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";
import jwt from "jsonwebtoken";

// Register User
export const registerUser = async (req, res, next) => {
  // const { fullName, username, email, password } = req.body;
  const { fullName, email, password } = req.body;

  try {
    // find the user if exist
    const user = await findUserByEmail(email);

    if (user) {
      throw new ApiError(409, "User with this email already exists");
    }

    // hash the password
    const hashedPassword = await hashPassword(password);

    // create the user
    // const newUser = await createUser(fullName, username, email, hashedPassword);
    const newUser = await createUser(fullName, email, hashedPassword);

    // send verification email
    const mailResult = await sendVerificationEmail(newUser.email, newUser._id);

    if (!mailResult) {
      throw new ApiError(500, "Failed to send verification email");
    }

    const safeUser = {
      fullName: newUser.fullName,
      email: newUser.email,
    };

    const response = new ApiResponse(
      200,
      "User registered successfully",
      safeUser
    );
    return res.status(200).json(response);

  } catch (error) {
    console.log("register controller error: ", error);
    // return res.status(500).json("Internal Server Error");
    next(error);
  }
};

// Verify Email
export const verifyEmail = async (req, res, next) => {
  const token = req.query.token;

  try {
    if (!token) {
      throw new ApiError(400, "Token not provided");
    }

    const decoded = jwt.verify(token, process.env.EMAIL_VERIFICATION_SECRET);

    if (!decoded) {
      console.log("Invalid or expired token", decoded);
      throw new ApiError(400, "Invalid or expired token");
    }

    const userId = decoded.id;

    const user = await User.findById(userId);

    // console.log("user found on verify: ", user);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (user.emailVerified) {
      // console.log("Email already verified", user.emailVerified);

      return res
      .status(200)
      .json(new ApiResponse(200, "Email already verified"));
    }

    user.emailVerified = true;
    await user.save();

    return res
      .status(200)
      .json(new ApiResponse(200, "Email verified successfully"));

  } catch (err) {
    next(err);
  }
};

// Login User
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // find the user by email if exist
    const user = await findUserByEmail(email);

    if (!user) {
      // return res.status(401).json("User with email or username does not exist");
      console.log("User with email does not exist");
      throw new ApiError(401, "Invalid Credentials");
    }

    if (!user.emailVerified) {
      throw new ApiError(403, "Please verify your email before logging in");
    }

    // compare the password
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      // return res.status(401).json("Invalid Credentials");
      throw new ApiError(401, "Invalid Credentials");
    }

    const accessToken = generateAccessToken(
      user._id,
      user.fullName,
      // user.username,
      user.email
    );
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    // No — you do not need cookie-parser to send cookies.
    // Cookie-parser is for reading cookies from incoming requests. like
    // const token = req.cookies.accessToken;
    // Now you need to use cookie-parser, because Express does not parse cookies by default.

    /*
      how to use
      -----------
      import cookieParser from 'cookie-parser';
      app.use(cookieParser());

      */

    /*
      When you are setting cookies using:
      res.cookie("accessToken", accessToken, options);

      Express handles this natively. You don’t need cookie-parser for this.

      */

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    };

    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    }); // 15 minutes
    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    }); // 7 days

    const response = new ApiResponse(200, "Logged in Successfully", {
      accessToken,
      refreshToken,
    });
    return res.status(200).json(response);

    // return res.status(200).json({ message: "Logged in Successfully", accessToken: accessToken, refreshToken: refreshToken});
  } catch (error) {
    console.log("login controller error: ", error);
    // return res.status(500).json("Internal Server Error");
    next(error);
  }
};

// Forgot Password
export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      throw new ApiError(404, "Email not found");
    }

    // send reset password email
    const mailResult = await sendResetPasswordEmail(user.email, user._id);

    if (!mailResult) {
      throw new ApiError(500, "Failed to send reset password email");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Reset password email sent successfully"));

  } catch (error) {
    console.log("forgotPassword controller error: ", error);
    next(error);
  }
}

// Reset Password
export const resetPassword = async (req, res, next) => {

  try {
    const { token, password } = req.body;

    // verify the token
    const decoded = jwt.verify(token, process.env.PASSWORD_RESET_SECRET);
    const user = await User.findById(decoded.id);
    
    if(!user) {
      throw new ApiError(400, "Invalid token");
    }

    // hash the password
    const hashedPassword = await hashPassword(password);

    // update the password
    user.password = hashedPassword;
    await user.save();

    return res
      .status(200)
      .json(new ApiResponse(200, "Password reset successfully"));
    
  } catch (error) {
    console.log("resetPassword controller error: ", error);
    next(error);
  }

}

// Logout User
export const logoutUser = async (req, res) => {
  // to read cookies we need to use cookie-parser in app.js as middleware
  /*
      how to use
      -----------
      import cookieParser from 'cookie-parser';
      app.use(cookieParser());

      */

  const refreshToken = req.cookies.refreshToken;

  console.log("refreshToken: ", refreshToken);

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return res.status(200).json({ message: "Logged out successfully" });
};
