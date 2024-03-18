const asyncHandler = require("express-async-handler");
const Plan = require("../models/planModel");

const createPlan = asyncHandler(async (req, res) => {
  const { name, price, duration } = req.body;

  if ((!name, !price, !duration)) {
    res.status(404);
    throw new Error("All fields Required!");
  }

  const plan = await Plan.create({
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

  const plan = await Plan.findByIdAndUpdate(planId, {
    name,
    price,
    duration,
  });

  res.status(200).json({ message: "Plan updated successfully!" });
});

const getAllPlans = asyncHandler(async (req, res) => {
  const plans = await Plan.find();

  if (!plans) {
    res.status(404);
    throw new Error("Plans Not Found!");
  }

  res.status(200).json(plans);
});

const getSinglePlan = asyncHandler(async (req, res) => {
  const planId = req.params.id;

  const plan = await Plan.findById(planId);

  if (!plan) {
    res.status(404);
    throw new Error("Plan Not Found!");
  }

  res.status(200).json(plan);
});

const deletePlan = asyncHandler(async (req, res) => {
  const planId = req.params.id;

  const plan = await Plan.findByIdAndDelete(planId);

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
  updatePlan
};
