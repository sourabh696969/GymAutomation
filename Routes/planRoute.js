const express = require("express");
const {
  createPlan,
  updatePlan,
  getAllPlans,
  getSinglePlan,
  deletePlan,
  createPlanUser,
  updatePlanUser,
  getAllPlansUser,
  getSinglePlanUser,
  deleteUserPlan,
} = require("../controllers/planController");

const router = express.Router();

// Gym Plan Routes
router.post("/create", createPlan);
router.put("/update/:id", updatePlan);
router.get("/", getAllPlans);
router.get("/:id", getSinglePlan);
router.delete("/:id", deletePlan);

// User Plan Routes
router.post("/create", createPlanUser);
router.put("/update/:id", updatePlanUser);
router.get("/", getAllPlansUser);
router.get("/:id", getSinglePlanUser);
router.delete("/:id", deleteUserPlan);

module.exports = router;
