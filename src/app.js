import express from "express";
import { authRoute } from "./routes/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.middleware.js";

const app = express();

// middlewares
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: "*",
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


// Global Error Handling Middleware
app.use(globalErrorHandler);


export default app;