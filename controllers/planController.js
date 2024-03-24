const asyncHandler = require("express-async-handler");
const { GymPlan, UserPlan } = require("../models/planModel");

// Gym Plan Controllers
const createPlan = asyncHandler(async (req, res) => {
  const { name, price, duration } = req.body;

  if ((!name, !price, !duration)) {
    res.status(404);
    throw new Error("All fields Required!");
  }

  const plan = await GymPlan.create({
    name,
    price,
    duration,
  });

  res.status(201).json({ message: "Plan created successfully!", plan });
});

const updatePlan = asyncHandler(async (req, res) => {
  const planId = req.params.id;

  const { name, price, duration } = req.body;

  if ((!name, !price, !duration)) {
    res.status(404);
    throw new Error("All fields Required!");
  }

  const plan = await GymPlan.findByIdAndUpdate(planId, {
    name,
    price,
    duration,
  });

  res.status(200).json({ message: "Plan updated successfully!" });
});

const getAllPlans = asyncHandler(async (req, res) => {
  const plans = await GymPlan.find();

  if (!plans) {
    res.status(404);
    throw new Error("Plans Not Found!");
  }

  res.status(200).json(plans);
});

const getSinglePlan = asyncHandler(async (req, res) => {
  const planId = req.params.id;

  const plan = await GymPlan.findById(planId);

  if (!plan) {
    res.status(404);
    throw new Error("Plan Not Found!");
  }

  res.status(200).json(plan);
});

const deletePlan = asyncHandler(async (req, res) => {
  const planId = req.params.id;

  const plan = await GymPlan.findByIdAndDelete(planId);

  if (!plan) {
    res.status(404);
    throw new Error("Plan Not Found!");
  }

  res.status(200).json({ message: "Plan deleted sucessfully!" });
});

// User Plan Controllers
const createPlanUser = asyncHandler(async (req, res) => {
  const { name, price, duration } = req.body;

  if ((!name, !price, !duration)) {
    res.status(404);
    throw new Error("All fields Required!");
  }

  const plan = await UserPlan.create({
    name,
    price,
    duration,
  });

  res.status(201).json({ message: "Plan created successfully!", plan });
});

const updatePlanUser = asyncHandler(async (req, res) => {
  const planId = req.params.id;

  const { name, price, duration } = req.body;

  if ((!name, !price, !duration)) {
    res.status(404);
    throw new Error("All fields Required!");
  }

  const plan = await UserPlan.findByIdAndUpdate(planId, {
    name,
    price,
    duration,
  });

  res.status(200).json({ message: "Plan updated successfully!" });
});

const getAllPlansUser = asyncHandler(async (req, res) => {
  const plans = await UserPlan.find();

  if (!plans) {
    res.status(404);
    throw new Error("Plans Not Found!");
  }

  res.status(200).json(plans);
});

const getSinglePlanUser = asyncHandler(async (req, res) => {
  const planId = req.params.id;

  const plan = await UserPlan.findById(planId);

  if (!plan) {
    res.status(404);
    throw new Error("Plan Not Found!");
  }

  res.status(200).json(plan);
});

const deleteUserPlan = asyncHandler(async (req, res) => {
  const planId = req.params.id;

  const plan = await UserPlan.findByIdAndDelete(planId);

  if (!plan) {
    res.status(404);
    throw new Error("Plan Not Found!");
  }

  res.status(200).json({ message: "Plan deleted sucessfully!" });
});

module.exports = {
  createPlan,
  getAllPlans,
  getSinglePlan,
  deletePlan,
  updatePlan,
  createPlanUser,
  updatePlanUser,
  getAllPlansUser,
  getSinglePlanUser,
  deleteUserPlan,
};
