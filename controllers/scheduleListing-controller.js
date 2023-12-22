import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import scheduleListing from "../models/schedulerListing-model.js";

// request scheduler
export const requestScheduler = async (req, res, next) => {
    try {
      const scheduleListing = await scheduleListing.create(req.body);
      return res.status(201).json(scheduleListing);
    } catch (error) {
      next(error);
    }
  };