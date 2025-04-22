import rateLimit from "express-rate-limit";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  loginRateLimiterByEmail,
  loginRateLimiterByIP,
  rateLimiterByEmail,
  rateLimiterByIP,
  rateLimiterByVerifyToken,
} from "../utils/rateLimiters.js";

// 5 requests per 15 mins per IP
export const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: {
    status: 429,
    message: "Too many registration attempts. Please try again later.",
  },
});

// Rate Limiter Middleware by Email
export const emailRateLimitMiddleware = async (req, res, next) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).json(new ApiResponse(400, "Email is required"));
  }

  try {
    await rateLimiterByEmail.consume(email.toLowerCase());
    next();
  } catch (error) {
    console.log("email rate limit middleware error: ", error);
    return res
      .status(429)
      .json(
        new ApiResponse(
          429,
          "Too many registration attempts for this email. Try again later."
        )
      );
  }
};

// Rate Limiter Middleware by IP
export const ipRateLimitMiddleware = async (req, res, next) => {
  const ip = req.ip;

  try {
    await rateLimiterByIP.consume(ip);
    next();
  } catch (error) {
    console.log("ip rate limit middleware error: ", error);
    return res
      .status(429)
      .json(
        new ApiResponse(
          429,
          "Too many registration attempts for this IP. Try again later."
        )
      );
  }
};

// Rate Limiter Middleware by Verify Token
export const verifyTokenRateLimitMiddleware = async (req, res, next) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json(new ApiResponse(400, "Missing token"));
  }

  try {
    await rateLimiterByVerifyToken.consume(token);
    next();
  } catch (error) {
    console.log("verify token rate limit middleware error: ", error);
    return res
      .status(429)
      .json(
        new ApiResponse(
          429,
          "Too many registration attempts for this token. Try again later."
        )
      );
  }
};

// For Login Limiter Middleware
export const loginIpRateLimiterMiddleware = async (req, res, next) => {
  const ip = req.ip;

  console.log("ip address login user: ", ip);

  try {
    await loginRateLimiterByIP.consume(ip);
    next();
  } catch (error) {
    console.log("login ip rate limit middleware error: ", error);
    return res
      .status(429)
      .json(
        new ApiResponse(
          429,
          "Too many login attempts for this IP. Try again later."
        )
      );
  }
};

export const loginEmailRateLimiterMiddleware = async (req, res, next) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).json(new ApiResponse(400, "Email is required"));
  }

  try {
    await loginRateLimiterByEmail.consume(email.toLowerCase());
    next();
  } catch (error) {
    console.log("login email rate limit middleware error: ", error);
    return res
      .status(429)
      .json(
        new ApiResponse(
          429,
          "Too many login attempts for this email. Try again later."
        )
      );  
  }
};
