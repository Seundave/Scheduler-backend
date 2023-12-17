import mongoose from "mongoose";

const AdminSchema = mongoose.Schema(
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
    password: {
      type: String,
      required: true,
    },
    resource: {
      type: String,
      required: true,
      // unique:true
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;
