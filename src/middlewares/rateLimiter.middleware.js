import rateLimit from "express-rate-limit";
import { ApiResponse } from "../utils/ApiResponse.js";
import { rateLimiterByEmail } from "../utils/rateLimiters.js";

// 5 requests per 15 mins per IP
export const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: {
    status: 429,
    message: "Too many registration attempts. Please try again later.",
  },
});


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
        return res.status(429).json(new ApiResponse(429, "Too many registration attempts for this email. Try again later."));
    }

}