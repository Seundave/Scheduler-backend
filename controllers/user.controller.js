import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import schedulerUser from "../models/user.model.js";

//create an user
export const createSchedulerUser = async (req, res, next) => {
  const { name, faculty, department, email, password, pfNumber, role } =
    req.body;

  const hashedPassword = await bcryptjs.hashSync(password, 10);
  const newSchedulerUser = new schedulerUser({
    name,
    faculty,
    department,
    email,
    password: hashedPassword,
    pfNumber,
    role,
  });

  try {
    await newSchedulerUser.save();
    res.status(201).json(newSchedulerUser); // Return a JSON object for consistency
  } catch (error) {
    next(error);
  }
};

// sign in user
export const signinSchedulerUser = async (req, res, next) => {
  const { email, pfNumber, password } = req.body;
  try {
    let validUser;

    // Check if the user provided an email or PF number
    if (email) {
      validUser = await schedulerUser.findOne({ email });
    } else if (pfNumber) {
      validUser = await schedulerUser.findOne({ pfNumber });
    }

    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong credentials"));
    }

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

//get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await schedulerUser.find({}, "-password");
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

//get a user

export const getUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await schedulerUser.findById(userId, "-password"); //Exclude the password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

//delete a user
export const deleteUser = async (req, res, next) => {
    const userId = req.params.id;
    try {
      const deletedUser = await schedulerUser.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  };

  //update admin
export const updateUser = async (req, res, next) => {
    console.log(req);
    const userId = req.params.id;
  
    try {
      const updatedUser = await schedulerUser.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            name: req.body.name,
            faculty: req.body.faculty,
            department: req.body.department,
            pfNumber: req.body.pfNumber,
            password: req.body.password,
            email: req.body.email,
            role:req.body.role,
          },
        },
        { new: true }
      );
  
      if (!updatedUser) {
        res.status(404).json({ message: "User not found" });
      }
  
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
