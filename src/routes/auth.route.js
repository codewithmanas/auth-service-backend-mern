import express from "express";
import { loginUser, logoutUser, registerUser, verifyEmail } from "../controllers/auth.controller.js";

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

// logout
router.post("/logout", logoutUser);

export default router;
