const asyncHandler = require("express-async-handler");
const Gym = require("../models/gymModel");
const { Notification } = require("../models/adminNotificationModel");
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
    !memberInGym)
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
    plan: "65f97be01eead1032ba42174",
  });

  res.status(201).json({ message: "Gym registered successfully!", gym });
  await Notification.create({
    notification: `${gymName} !! New Gym registered.`,
  });
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
    !memberInGym)
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
  });

  res.status(200).json({ message: "Gym updated successfully!" });
});

const updateGymPlan = asyncHandler(async (req, res) => {
  const gymId = req.params.id;
  const { plan, status, paymentMode } = req.body;

  if (status === undefined || status === null || status === "") {
    res.status(404);
    throw new Error("All fields Required!");
  }

  planUpdatedOn = new Date();

  await Gym.findByIdAndUpdate(gymId, {
    plan,
    planUpdatedOn,
    status,
    paymentMode,
  });

  const gym = await Gym.findById(gymId).populate("plan");

  const planDurationInDays = gym.plan.duration * 30;

  let ExpiryDate = planUpdatedOn.setDate(
    planUpdatedOn.getDate() + planDurationInDays
  );

  if (status == false) {
    await Gym.findByIdAndUpdate(gymId, {
      ExpiryDate: planUpdatedOn,
      plan: null,
    });
    res.status(200).json({ message: "Gym updated successfully!" });
  }

  await Gym.findByIdAndUpdate(gymId, {
    ExpiryDate,
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
    throw new Error("Gym not found!");
  }

  if (!(await bcrypt.compare(password, gymAvailable.password))) {
    res.status(403);
    throw new Error("Please enter new password!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  if (email == gymAvailable.email) {
    const newPassword = await Gym.updateOne({
      password: hashedPassword,
    });
  }
  res.status(200).json({
    message: "password changed successfully!",
  });
});

const getAllGyms = asyncHandler(async (req, res) => {
  const gyms = await Gym.find()
    .select("-password")
    .populate("plan", "name price");

  if (!gyms) {
    res.status(404);
    throw new Error("Gym Not Found!");
  }

  res.status(200).json(gyms);
});

const getSingleGym = asyncHandler(async (req, res) => {
  const gymId = req.params.id;

  const gym = await Gym.findById(gymId)
    .select("-password")
    .populate("plan", "name price");

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
