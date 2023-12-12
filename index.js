import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import UserRouter from "./routes/user.route.js"
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

app.use('/user', UserRouter)

app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
