import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import ScheduleListing from "../models/schedulerListing.model.js";

// request scheduler
export const requestScheduler = async (req, res, next) => {
  try {
    const scheduleListing = await ScheduleListing.create(req.body);
    return res.status(201).json(scheduleListing);
  } catch (error) {
    next(error);
  }
};

//update scheduler
export const updateScheduler = async (req, res, next) => {
  const schedulerListings = await ScheduleListing.findById(req.params.id);
  if (!schedulerListings) {
    return next(errorHandler(404, "Schedule request not found!"));
  }
  if (req.user.id !== schedulerListings.userRef) {
    console.log(req.user.id, schedulerListings.userRef);

    // console.log(req.user);
    return next(
      errorHandler(401, "You can only update your own scheduler lisitings!")
    );
  }

  try {
    const updatedSchedulerListing = await ScheduleListing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedSchedulerListing);
  } catch (error) {
    next(error);
  }
};

//get a scheduler listing
export const getSchedulerListing = async (req, res, next) => {
  try {
    const schedulerListing = await ScheduleListing.findById(req.params.id);
    // console.log(schedulerListing);
    if (!schedulerListing) {
      return next(errorHandler(404, "No scheduler request!"));
    }
    res.status(200).json(schedulerListing);
  } catch (error) {
    next(error);
  }
};

//delete a scheduler listing
export const deleteSchedulerListing = async (req, res, next) => {
  const schedulerListing = await ScheduleListing.findById(req.params.id);

  if (!schedulerListing) {
    return next(errorHandler(404, "Listing not found!"));
  }

  if (req.user.id !== schedulerListing.userRef) {
    return next(errorHandler(401, "You can only delete your own listings"));
  }

  try {
    await ScheduleListing.findByIdAndDelete(req.params.id);
    res.status(200).json("Scheduler request has been deleted");
  } catch (error) {
    next(error);
  }
};

//get all listings

export const getAllSchedulerListings = async (req, res, next) => {
  try {
    // Check if the user is an admin (you may have your own admin verification logic)
    // const isAdmin = req.user.isAdmin; // Assuming there's an 'isAdmin' property in the user object

    // if (!isAdmin) {
    //   return next(errorHandler(403, "Unauthorized! Only admin can perform this action"));
    // }

    // Fetch all scheduler listings from the database
    const allListings = await ScheduleListing.find({});

    res.status(200).json(allListings);
  } catch (error) {
    next(error);
  }
};

//filter userListing
export const filterUserListing = async (req, res, next) => {
  try {
    const { lectureTheatre, date, status } = req.body; // Destructure faculty and department from req.body

    console.log(req.body);
    let filter = {}; // Initialize an empty filter

    // If faculty or department is provided, include it/them in the filter
    if (lectureTheatre) {
      filter.lectureTheatre = lectureTheatre;
    }
    if (date) {
      filter.date = date;
    }
    if (status) {
      filter.status = status;
    }

    const filteredListings = await ScheduleListing.find({
      $or: [
        { lectureTheatre: filter.lectureTheatre }, // Match faculty if provided
        { date: filter.date }, // Match department if provided
        { status: filter.status }, // Match department if provided
      ],
    });

    if (filteredListings.length === 0) {
      return res.status(404).json({ message: "No record found" });
    }

    res.status(200).json(filteredListings);
  } catch (error) {
    // Log the error for debugging purposes
    console.error(error);
    next(error);
  }
};
