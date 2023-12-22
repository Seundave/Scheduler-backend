import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { requestScheduler } from "../controllers/scheduleListing-controller.js";

const router = express.Router();

router.post("/request-scheduler", verifyToken, requestScheduler);


export default router;