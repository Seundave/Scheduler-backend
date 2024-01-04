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
    date: {
      type: Date,
      required: true,
      // unique:true,
    },
    time: {
      type: Array,
      required: true,
      // unique:true,
    },
    userRef: {
      type: String,
      required: true,
    },
    status:{
      type:String,
      default:"pending"
    }
  },
  { timestamps: true }
);

const ScheduleListing = mongoose.model("ScheduleListing", scheduleSchema);

export default ScheduleListing;