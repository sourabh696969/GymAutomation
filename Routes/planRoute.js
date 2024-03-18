const express = require("express");
const {
  createPlan,
  updatePlan,
  getAllPlans,
  getSinglePlan,
  deletePlan,
} = require("../controllers/planController");

const router = express.Router();

router.post("/create", createPlan);
router.put("/update/:id", updatePlan);
router.get("/", getAllPlans);
router.get("/:id", getSinglePlan);
router.delete("/:id", deletePlan);

module.exports = router;
