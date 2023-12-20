import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import schedulerRouter from "./routes/scheduler.route.js";
import { errorHandler } from "./utils/error.js";
dotenv.config();

const PORT = 3000 || process.env.PORT;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

app.use(express.json());

app.use(cookieParser());

// set permission for domain that can connect to the database
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    // credentials: true,
  })
);

app.use("/admin", userRouter);
app.use("/auth", authRouter);
app.use("/scheduler", schedulerRouter);

// Middleware to handle errors
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.use(errorHandler)

app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
