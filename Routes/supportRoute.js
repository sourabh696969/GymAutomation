const express = require("express");
const {
  createSupportGym,
  getGymSupport,
  getGymSupportById,
  deleteGymSupport,
  updateSupportStatusOfGym,
} = require("../controllers/supportController");
const { validateUserToken } = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/create", validateUserToken, createSupportGym);
router.patch("/update/:id", updateSupportStatusOfGym);
router.get("/", getGymSupport);
router.get("/:id", getGymSupportById);
router.delete("/:id", deleteGymSupport);

module.exports = router;
