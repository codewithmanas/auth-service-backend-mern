import express from "express";
import { authRoute } from "./routes/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.middleware.js";
import { FRONTEND_BASE_URL } from "./constant.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import session from "express-session";

const app = express();

import './configs/passport.js';

// middlewares
app.use(
  cors({
    origin: FRONTEND_BASE_URL,
    // origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());


app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// This is needed to get the ip address of the client
// if app is running behind a proxy like nginx, cloudflare and vercel
// TODO: only working in development, fix later
// app.set('trust proxy', true);




// Initiate OAuth with Google
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Handle callback from Google
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/auth/failure" }),
  (req, res) => {
    const user = req.user;

    // Sign JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_BASE_URL}/oauth-success?token=${token}`);
  }
);

// For failure
app.get("/auth/failure", (req, res) => {
  res.status(401).json({ message: "OAuth failed" });
});

// app.get("/", (req, res) => {
//     res.send("App is running");
// });

app.get("/health", (req, res) => {
  res.send("App is healthy");
});

// routes
app.use("/api/auth", authRoute);

// TODO: need to implement error handling of not found routes
// app.use((req, res) => {
//   res.status(404).json({ message: "Route not found" });
// });


// Global Error Handling Middleware
app.use(globalErrorHandler);


export default app;