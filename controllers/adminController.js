const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const Gym = require("../models/gymModel");
const User = require("../models/userModel");
const Plan = require("../models/planModel");
const { GymSupport } = require("../models/supportModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

///// Admin Authentication
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ((!name, !email, !password)) {
    res.status(404);
    throw new Error("All fields required!");
  }

  const adminEmail = await Admin.findOne({ email });
  const adminCount = await Admin.find().count();

  if (adminEmail) {
    res.status(403);
    throw new Error("Admin already exist with this email!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  if (adminCount < 1) {
    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Admin Registered!", admin });
  }
  res.status(401).json({ message: "Cannot create more than 1 admin!" });
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    res.status(404);
    throw new Error("All fields required!");
  }
  const adminAvailable = await Admin.findOne({ email });
  if (!adminAvailable) {
    res.status(404);
    throw new Error("Admin not found!");
  }

  if (!(await bcrypt.compare(password, adminAvailable.password))) {
    res.status(404);
    throw new Error("email or password is wrong!");
  }

  const accessToken = jwt.sign(
    {
      user: {
        _id: adminAvailable._id,
      },
    },
    process.env.SECRET_KEY
  );
  res.status(200).json({
    message: "Admin logged In successfully!",
    _id: adminAvailable._id,
    token: accessToken,
  });
});

const forgotPasswordAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if ((!email, !password)) {
    res.status(404);
    throw new Error("All fields required!");
  }
  const adminAvailable = await Admin.findOne({ email });

  if (!adminAvailable) {
    res.status(404);
    throw new Error("Admin not found!");
  }

  if (!(await bcrypt.compare(password, adminAvailable.password))) {
    res.status(403);
    throw new Error("Please enter new password!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  if (email == adminAvailable.email) {
    const newPassword = await Admin.updateOne({
      password: hashedPassword,
    });
  }
  res.status(200).json({
    message: "password changed successfully!",
  });
});

const getLengthOfData = asyncHandler(async (req, res) => {
  const totalUser = await User.find().count();
  const totalGym = await Gym.find().count();
  const totalGymSupport = await GymSupport.find().count();
  const totalGymPlan = await Plan.find().count();

  res.status(200).json({
    UserCount: totalUser,
    GymCount: totalGym,
    GymSupportCount: totalGymSupport,
    GymPlanCount: totalGymPlan,
  });
});

module.exports = {
  registerAdmin,
  loginAdmin,
  forgotPasswordAdmin,
  getLengthOfData,
};
