import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  deleteSchedulerListing,
  getAllSchedulerListings,
  getSchedulerListing,
  requestScheduler,
  updateScheduler,
} from "../controllers/scheduleListing-controller.js";

const router = express.Router();

router.post("/request-scheduler", verifyToken, requestScheduler);
router.patch("/update-scheduler/:id", verifyToken, updateScheduler);
router.delete("/delete-scheduler/:id", verifyToken, deleteSchedulerListing);
router.get("/get-scheduler/:id", getSchedulerListing);
router.get("/all-listings", getAllSchedulerListings);

export default router;
