import express from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Auth route");
});

// to get collection of user
router.get("/users", () => {
    res.send("User collection");
});

// register
router.post("/register", registerUser);

// login
router.post("/login", loginUser);

// login
router.post("/login", () => {
    res.send("login route");
});

// logout
router.post("/logout", () => {
    res.send("logout route");
});

export default router;
