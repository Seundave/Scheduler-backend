import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";

//create an admin
export const createadmin = async (req, res, next) => {
  const { name, faculty, department, email, password, resource } = req.body;

  const hashedPassword = await bcryptjs.hashSync(password, 10);
  const newAdmin = new Admin({
    name,
    faculty,
    department,
    email,
    password: hashedPassword,
    resource,
  });

  try {
    await newAdmin.save();
    res.status(201).json(newAdmin); // Return a JSON object for consistency
  } catch (error) {
    next(error);
  }
};

// sign in admin
export const signinadmin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await Admin.findOne({ email });
    console.log(validUser);
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc; //To remove the password from showing inside the data
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

//get all admins
export const getalladmins = async (req, res, next) => {
  try {
    const allAdmins = await Admin.find({}, "-password");
    res.status(200).json(allAdmins);
  } catch (error) {
    next(error);
  }
};

//get an admin
export const getadmin = async (req, res, next) => {
  const adminId = req.params.id;
  try {
    const admin = await Admin.findById(adminId, "-password"); //Exclude the password
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    next(error);
  }
};

//delete an admin
export const deleteadmin = async (req, res, next) => {
  const adminId = req.params.id;
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(adminId);
    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    next(error);
  }
};

//update admin
export const updateadmin = async (req, res, next) => {
  console.log(req);
  const adminId = req.params.id;

  try {
    const updatedAdmin = await Admin.findOneAndUpdate(
      { _id: adminId },
      {
        $set: {
          name: req.body.name,
          faculty: req.body.faculty,
          department: req.body.department,
          resource: req.body.resource,
          password: req.body.password,
          email: req.body.email,
        },
      },
      { new: true }
    );

    if (!updatedAdmin) {
      res.status(404).json({ message: "Admin not found" });
    }

    const { password, ...rest } = updatedAdmin._doc;
    res.status(200).json(rest);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//get-admins

// export const getadmins = async (req, res, next) => {
//   const { faculty, department } = req.query;
//   try {
//     let admins;
//     if (faculty) {
//       admins = await Admin.find({ faculty });
//     } else if (department) {
//       admins = await Admin.find({ department });
//     } else {
//       admins = await Admin.find();
//     }
//     res.json({ admins });
//   } catch (error) {
//     next(error);
//   }
// };

//filter admin
// export const filteradmin = async (req, res, next) => {
//   try {
//     const { faculty, department } = req.body;
//     const filteredAdmins = await Admin.find({
//       faculty,
//       department,
//     });
//     if (filteredAdmins.length === 0) {
//       return res.status(404).json({ message: "Admin not found" });
//     }
//     res.status(200).json(filteredAdmins);
//   } catch (error) {
//     next(error);
//   }
// };

//filter admin
export const filteradmin = async (req, res, next) => {
  try {
    const { faculty, department } = req.body; // Destructure faculty and department from req.body

    console.log(req.body);
    let filter = {}; // Initialize an empty filter

    // If faculty or department is provided, include it/them in the filter
    if (faculty) {
      filter.faculty = faculty;
    }
    if (department) {
      filter.department = department;
    }

    const filteredAdmins = await Admin.find({
      $or: [
        { faculty: filter.faculty }, // Match faculty if provided
        { department: filter.department }, // Match department if provided
      ],
    });

    if (filteredAdmins.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json(filteredAdmins);
  } catch (error) {
    // Log the error for debugging purposes
    console.error(error);
    next(error);
  }
};
