import express from "express";
import { authRoute } from "./routes/index.js";
// import { authRoute } from "./routes/index.js";

const app = express();

// middlewares
app.use(express.json());

// routes
app.use("/api/auth", authRoute);

// app.get("/", (req, res) => {
//     res.send("App is running");
// });

app.get("/health", (req, res) => {
    res.send("App is healthy");
})

export default app;