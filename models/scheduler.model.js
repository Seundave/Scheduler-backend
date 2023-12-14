import mongoose from "mongoose";

const schedulerSchema = mongoose.Schema(
  {
    lectureTheatre: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    capacity: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Scheduler = mongoose.model("Scheduler", schedulerSchema);

export default Scheduler;
