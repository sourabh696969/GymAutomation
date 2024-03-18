const asyncHandler = require("express-async-handler");
const Gym = require("../models/gymModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerGym = asyncHandler(async (req, res) => {
  const {
    gymName,
    ownerName,
    phone,
    email,
    password,
    address,
    state,
    city,
    pincode,
    memberInGym,
    paymentMode,
  } = req.body;

  if (
    (!gymName,
    !ownerName,
    !phone,
    !email,
    !password,
    !address,
    !state,
    !city,
    !pincode,
    !memberInGym,
    !paymentMode)
  ) {
    res.status(404);
    throw new Error("All fields Required!");
  }

  const image = req.files["image"] ? req.files["image"][0].path : null;

  const hashedPassword = await bcrypt.hash(password, 10);

  const gym = await Gym.create({
    gymName,
    ownerName,
    phone,
    email,
    password: hashedPassword,
    address,
    state,
    city,
    pincode,
    image,
    memberInGym,
    paymentMode,
  });

  res.status(201).json({ message: "Gym registered successfully!", gym });
});

const updateGym = asyncHandler(async (req, res) => {
  const gymId = req.params.id;

  const gymImage = await Gym.findById(gymId);

  if (!gymImage) {
    res.status(404);
    throw new Error("Gym Not Found!");
  }

  const {
    gymName,
    ownerName,
    phone,
    email,
    address,
    state,
    city,
    pincode,
    memberInGym,
    paymentMode,
  } = req.body;

  if (
    (!gymName,
    !ownerName,
    !phone,
    !email,
    !address,
    !state,
    !city,
    !pincode,
    !memberInGym,
    !paymentMode)
  ) {
    res.status(404);
    throw new Error("All fields Required!");
  }

  const image = req.files["image"] ? req.files["image"][0].path : null;

  const gym = await Gym.findByIdAndUpdate(gymId, {
    gymName,
    ownerName,
    phone,
    email,
    address,
    state,
    city,
    pincode,
    image: image == null ? gymImage.image : image,
    memberInGym,
    paymentMode,
  });

  res.status(200).json({ message: "Gym updated successfully!" });
});

const updateGymPlan = asyncHandler(async (req, res) => {
  const gymId = req.params.id;
  const { plan } = req.body;

  if (!plan) {
    res.status(404);
    throw new Error("All fields Required!");
  }
  planUpdatedOn = new Date();

  const gym = await Gym.findByIdAndUpdate(gymId, {
    plan,
    planUpdatedOn,
  });

  res.status(200).json({ message: "Gym updated successfully!" });
});

const loginGym = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    res.status(404);
    throw new Error("All fields required!");
  }
  const gymAvailable = await Gym.findOne({ email });
  if (!gymAvailable) {
    res.status(404);
    throw new Error("Admin not found!");
  }

  if (!(await bcrypt.compare(password, gymAvailable.password))) {
    res.status(404);
    throw new Error("email or password is wrong!");
  }

  const accessToken = jwt.sign(
    {
      user: {
        _id: gymAvailable._id,
      },
    },
    process.env.SECRET_KEY
  );
  res.status(200).json({
    message: "Gym logged In successfully!",
    _id: gymAvailable._id,
    token: accessToken,
  });
});

const forgotPasswordGym = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if ((!email, !password)) {
    res.status(404);
    throw new Error("All fields required!");
  }
  const gymAvailable = await Gym.findOne({ email });

  if (!gymAvailable) {
    res.status(404);
    throw new Error("Admin not found!");
  }

  if (!(await bcrypt.compare(password, gymAvailable.password))) {
    res.status(403);
    throw new Error("Please enter new password!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  if (email == gymAvailable.email) {
    const newPassword = await Admin.updateOne({
      password: hashedPassword,
    });
  }
  res.status(200).json({
    message: "password changed successfully!",
  });
});

const getAllGyms = asyncHandler(async (req, res) => {
  const gyms = await Gym.find();

  if (!gyms) {
    res.status(404);
    throw new Error("Gym Not Found!");
  }

  res.status(200).json(gyms);
});

const getSingleGym = asyncHandler(async (req, res) => {
  const gymId = req.params.id;

  const gym = await Gym.findById(gymId);

  if (!gym) {
    res.status(404);
    throw new Error("Gym Not Found!");
  }

  res.status(200).json(gym);
});

const deleteGym = asyncHandler(async (req, res) => {
  const gymId = req.params.id;

  const gym = await Gym.findByIdAndDelete(gymId);

  if (!gym) {
    res.status(404);
    throw new Error("Gym Not Found!");
  }

  res.status(200).json({ message: "Gym deleted sucessfully!" });
});

module.exports = {
  registerGym,
  loginGym,
  forgotPasswordGym,
  updateGym,
  updateGymPlan,
  getAllGyms,
  getSingleGym,
  deleteGym,
};
