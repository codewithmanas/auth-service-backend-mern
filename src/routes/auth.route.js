import express from "express";
import {
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  verifyEmail,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Auth route");
});

// to get collection of user
router.get("/users", (req, res) => {
  res.send("User collection");
});

// register
router.post("/register", registerUser);

// verify email
router.get("/verify-email", verifyEmail);

// login
router.post("/login", loginUser);

// forgot password
router.post("/forgot-password", forgotPassword);

// reset password
router.post("/reset-password", resetPassword);

// logout
router.post("/logout", logoutUser);

export default router;
