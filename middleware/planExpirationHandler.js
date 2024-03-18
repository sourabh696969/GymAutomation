const asyncHandler = require("express-async-handler");
const Gym = require("../models/gymModel");

const checkPlanExpiration = asyncHandler(async (req, res, next) => {
  const gymId = req.user;
  try {
    const gym = await Gym.findById(gymId).populate("plan");

    if (!gym) {
      return res.status(404).json({ message: "User not found" });
    }

    const planDurationInDays = gym.plan.duration * 30;

    const expirationTime = new Date(gym.planUpdatedOn);
    expirationTime.setDate(expirationTime.getDate() + planDurationInDays);

    if (new Date() > expirationTime) {
      return res.status(401).json({
        message:
          "Plan has expired. Please update your subscription for access.",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = checkPlanExpiration;
