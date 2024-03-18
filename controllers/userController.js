const asyncHandler = require("express-async-handler");
const Gym = require("../models/gymModel");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const gymId = req.user;
  const {
    name,
    phone,
    email,
    password,
    address,
    state,
    city,
    pincode,
    timeSlot,
  } = req.body;

  if (
    (!name,
    !phone,
    !email,
    !password,
    !address,
    !state,
    !city,
    !pincode,
    !timeSlot)
  ) {
    res.status(404);
    throw new Error("All fields Required!");
  }

  const image = req.files["image"] ? req.files["image"][0].path : null;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    phone,
    email,
    password: hashedPassword,
    address,
    state,
    city,
    pincode,
    image,
    timeSlot,
    gymData: gymId,
  });

  res.status(201).json({ message: "User registered successfully!", user });
});

const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const userImage = await User.findById(userId);

  if (!userImage) {
    res.status(404);
    throw new Error("User Not Found!");
  }

  const { name, phone, email, address, state, city, pincode, timeSlot } =
    req.body;

  if (
    (!timeSlot, !phone, !email, !address, !state, !city, !pincode, !timeSlot)
  ) {
    res.status(404);
    throw new Error("All fields Required!");
  }

  const image = req.files["image"] ? req.files["image"][0].path : null;

  const user = await User.findByIdAndUpdate(userId, {
    name,
    phone,
    email,
    address,
    state,
    city,
    pincode,
    image: image == null ? userImage.image : image,
    timeSlot,
  });

  res.status(200).json({ message: "User updated successfully!" });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    res.status(404);
    throw new Error("All fields required!");
  }
  const userAvailable = await User.findOne({ email });
  if (!userAvailable) {
    res.status(404);
    throw new Error("User not found!");
  }

  if (!(await bcrypt.compare(password, userAvailable.password))) {
    res.status(404);
    throw new Error("email or password is wrong!");
  }

  const accessToken = jwt.sign(
    {
      user: {
        _id: userAvailable._id,
      },
    },
    process.env.SECRET_KEY
  );
  res.status(200).json({
    message: "User logged In successfully!",
    _id: userAvailable._id,
    token: accessToken,
  });
});

const forgotPasswordUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if ((!email, !password)) {
    res.status(404);
    throw new Error("All fields required!");
  }
  const userAvailable = await User.findOne({ email });

  if (!userAvailable) {
    res.status(404);
    throw new Error("User not found!");
  }

  if (await bcrypt.compare(password, userAvailable.password)) {
    res.status(403);
    throw new Error("Please enter new password!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  if (email == userAvailable.email) {
    const newPassword = await User.updateOne({
      password: hashedPassword,
    });
  }
  res.status(200).json({
    message: "password changed successfully!",
  });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const gymId = req.user;
  const users = await User.find({ gymData: gymId })
    .select("-password")
    .populate("gymData", "gymName ownerName");

  if (!users) {
    res.status(404);
    throw new Error("User Not Found!");
  }

  res.status(200).json(users);
});

const getAllUsersForAdmin = asyncHandler(async (req, res) => {
    const gymId = req.params.id;
    const users = await User.find({ gymData: gymId })
      .select("-password")
      .populate("gymData", "gymName ownerName");
  
    if (!users) {
      res.status(404);
      throw new Error("User Not Found!");
    }
  
    res.status(200).json(users);
  });

const getSingleUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User Not Found!");
  }

  res.status(200).json(user);
});

const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    res.status(404);
    throw new Error("User Not Found!");
  }

  res.status(200).json({ message: "User deleted sucessfully!" });
});

module.exports = {
  registerUser,
  loginUser,
  forgotPasswordUser,
  updateUser,
  getAllUsers,
  getAllUsersForAdmin,
  getSingleUser,
  deleteUser,
};
