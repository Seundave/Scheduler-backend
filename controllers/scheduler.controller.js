import Scheduler from "../models/scheduler.model.js";

//create a scheduler
export const createscheduler = async (req, res, next) => {
  const { lectureTheatre, location, capacity, description } = req.body;
  const newScheduler = new Scheduler({
    lectureTheatre,
    location,
    capacity,
    description,
  });

  try {
    await newScheduler.save();
    res.status(201).json({ message: "Scheduler created successfully" });
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
      schedulerId,
      {
        $set: {
          lectureTheatre: req.body.lectureTheatre,
          location: req.body.location,
          capacity: req.body.capacity,
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
