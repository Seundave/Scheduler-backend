import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      // unique: true,
    },
    faculty: {
      type: String,
      required: true,
      // unique:true,
    },
    department: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      // unique:true
    },
    pfNumber: {
        type: String,
        required: true,
        // unique:true
      },
    password: {
      type: String,
      required: true,
    },
    role:{
        type:String,
        default:"user"
    }
  },
  { timestamps: true }
);

const schedulerUser = mongoose.model("schedulerUser", UserSchema);

export default schedulerUser;