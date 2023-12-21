import express from "express";
import { createSchedulerUser, deleteUser, getAllUsers, getUser, signinSchedulerUser, updateUser } from "../controllers/user.controller.js";


const router = express.Router();

router.post("/create-user", createSchedulerUser);
router.post("/signin", signinSchedulerUser);
router.get("/get-users", getAllUsers);
router.get("/get-user/:id", getUser);
router.delete("/delete-user/:id", deleteUser);
router.patch("/update-user/:id", updateUser);

export default router;