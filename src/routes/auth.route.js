import express from "express";
import {
  forgotPassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import {
  emailRateLimitMiddleware,
  ipRateLimitMiddleware,
  loginEmailRateLimiterMiddleware,
  loginIpRateLimiterMiddleware,
  verifyTokenRateLimitMiddleware,
} from "../middlewares/rateLimiter.middleware.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Auth route");
});

// to get collection of user
router.get("/users", (req, res) => {
  res.send("User collection");
});

// register
// ipRateLimitMiddleware not working for now
router.post(
  "/register",
  ipRateLimitMiddleware,
  emailRateLimitMiddleware,
  registerUser
);

// verify email
router.get("/verify-email", verifyTokenRateLimitMiddleware, verifyEmail);

// login
router.post(
  "/login",
  // loginIpRateLimiterMiddleware,
  loginEmailRateLimiterMiddleware,
  loginUser
);

// forgot password
router.post("/forgot-password", forgotPassword);

// reset password
router.post("/reset-password", resetPassword);

// get current user
router.get("/current-user", authenticate, getCurrentUser);

// logout
router.post("/logout", authenticate, logoutUser);

export default router;
