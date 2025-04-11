import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js";

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

// login
router.post("/login", loginUser);

// logout
router.post("/logout", logoutUser);

export default router;
