import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema(
  {
    lectureTheatre: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      required: true,
    },
    selectedDate: {
      type: String,
      required: true,
    },
    selectedTime: {
      type: Number,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const scheduleListing = mongoose.model("scheduleListing", scheduleSchema);

export default scheduleListing;