import express from "express";
import { authRoute } from "./routes/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.middleware.js";
import { FRONTEND_BASE_URL } from "./constant.js";

const app = express();

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

// routes
app.use("/api/auth", authRoute);

// app.get("/", (req, res) => {
//     res.send("App is running");
// });

app.get("/health", (req, res) => {
  res.send("App is healthy");
});

// TODO: need to implement error handling of not found routes
// app.use((req, res) => {
//   res.status(404).json({ message: "Route not found" });
// });


// Global Error Handling Middleware
app.use(globalErrorHandler);


export default app;