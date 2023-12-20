import Scheduler from "../models/scheduler.model.js";

//create a scheduler
export const createscheduler = async (req, res, next) => {
  const {
    imageUrl,
    status,
    lectureTheatre,
    location,
    capacity,
    facilities,
    description,
  } = req.body;
  const newScheduler = new Scheduler({
    imageUrl,
    lectureTheatre,
    location,
    capacity,
    facilities,
    status,
    description,
  });

  try {
    await newScheduler.save();
    res.status(201).json(newScheduler);
  } catch (error) {
    next(error);
  }
};

//get all scheduler
export const getallscheduler = async (req, res, next) => {
  try {
    const allScheduler = await Scheduler.find({});
    res.status(201).json(allScheduler);
  } catch (error) {
    next(error);
  }
};

//delete a scheduler
export const deletescheduler = async (req, res, next) => {
  const schedulerId = req.params.id;
  try {
    const deleteScheduler = await Scheduler.findByIdAndDelete(schedulerId);
    if (!deleteScheduler) {
      return res.status(404).json({ message: "Scheduler not found" });
    }
    res.status(200).json({ message: "Scheduler deleted successfully" });
  } catch (error) {
    next(error);
  }
};

//get a scheduler
export const getscheduler = async (req, res, next) => {
  const schedulerId = req.params.id;
  try {
    const scheduler = await Scheduler.findById(schedulerId);
    if (!scheduler) {
      return res.status(404).json({ message: "Scheduler not found" });
    }
    res.status(200).json(scheduler);
  } catch (error) {
    next(error);
  }
};

//update scheduler
export const updatescheduler = async (req, res, next) => {
  const schedulerId = req.params.id;
  console.log(schedulerId);
  try {
    const updatedScheduler = await Scheduler.findOneAndUpdate(
      { _id: schedulerId },
      {
        $set: {
          imageUrl: req.body.imageUrl,
          lectureTheatre: req.body.lectureTheatre,
          location: req.body.location,
          capacity: req.body.capacity,
          status: req.body.status,
          description: req.body.description,
        },
      },
      { new: true }
    );

    if (!updatedScheduler) {
      res.status(404).json({ message: "Scheduler not found" });
    }

    const { password, ...rest } = updatedScheduler._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

//filter scheduler
export const filterscheduler = async (req, res, next) => {
  try {
    const { location, faculty, facilities } = req.body; // Destructure faculty and department from req.body

    let filter = {}; // Initialize an empty filter

    // If faculty or department is provided, include it/them in the filter
    if (location) {
      filter.location = location;
    }
    if (faculty) {
      filter.faculty = faculty;
    }
    if (facilities) {
      filter.facilities = facilities;
    }

    const filteredSchedulers = await Admin.find({
      $or: [
        { location: filter.location }, // Match faculty if provided
        { faculty: filter.faculty }, // Match department if provided
        { facilities: filter.facilities }, // Match department if provided
      ],
    });

    if (filteredSchedulers.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json(filteredSchedulers);
  } catch (error) {
    // Log the error for debugging purposes
    console.error(error);
    next(error);
  }
};
