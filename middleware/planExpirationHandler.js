const asyncHandler = require("express-async-handler");
const Gym = require("../models/gymModel");

const checkPlanExpiration = asyncHandler(async (req, res, next) => {
  const gymId = req.user;
  const gym = await Gym.findById(gymId).populate("plan");

  if (!gym) {
    res.status(404);
    throw new Error("User not found");
  }

  const planDurationInDays = gym.plan.duration * 30;

  const expirationTime = new Date(gym.planUpdatedOn);
  expirationTime.setDate(expirationTime.getDate() + planDurationInDays);

  if (new Date() > expirationTime) {
    await Gym.findByIdAndUpdate(gymId, {
      status: false,
    });
    res.status(401);
    throw new Error(
      "Plan has expired. Please update your subscription for access."
    );
  }

  next();
});

module.exports = checkPlanExpiration;
