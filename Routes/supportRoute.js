const express = require("express");
const {
  createSupportGym,
  getGymSupport,
  getGymSupportById,
  deleteGymSupport,
  updateSupportStatusOfGym,
} = require("../controllers/supportController");
const {
  createSupportUser,
  getUserSupport,
  getUserSupportById,
  deleteUserSupport,
  updateSupportStatusOfUser,
} = require("../controllers/userSuppoetController");
const { validateUserToken } = require("../middleware/validateTokenHandler");

const router = express.Router();

//// Gym Support Routes ////
router.post("/create", validateUserToken, createSupportGym);
router.patch("/update/:id", updateSupportStatusOfGym);
router.get("/", getGymSupport);
router.get("/:id", getGymSupportById);
router.delete("/:id", deleteGymSupport);

//// User Support Routes ////
router.post("/user/create", validateUserToken, createSupportUser);
router.patch("/user/update/:id", updateSupportStatusOfUser);
router.get("/user", getUserSupport);
router.get("/user/:id", getUserSupportById);
router.delete("/user/:id", deleteUserSupport);

module.exports = router;
