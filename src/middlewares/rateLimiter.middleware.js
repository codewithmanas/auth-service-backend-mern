import rateLimit from "express-rate-limit";

// 5 requests per 10 mins per IP
export const registerLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 2,
  message: {
    status: 429,
    message: "Too many registration attempts. Please try again later.",
  },
});
