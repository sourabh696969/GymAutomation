const express = require("express");
const {
  registerGym,
  getAllGyms,
  getSingleGym,
  deleteGym,
  updateGym,
  loginGym,
  forgotPasswordGym,
  updateGymPlan,
} = require("../controllers/gymController");
const uploadToCloudinary = require("../middleware/uploadToCloudnary");
const checkPlanExpiration = require("../middleware/planExpirationHandler");
const { validateUserToken } = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/register", uploadToCloudinary("image", 1), registerGym);
router.post("/login", loginGym);
router.put("/forgotPassword", forgotPasswordGym);
router.put("/update/:id", uploadToCloudinary("image", 1), updateGym);
router.put("/updatePlan/:id", updateGymPlan);
router.get("/", getAllGyms);
router.get("/:id", getSingleGym);
router.delete("/:id", deleteGym);

module.exports = router;
