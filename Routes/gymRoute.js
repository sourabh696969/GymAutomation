const express = require("express");
const { registerGym, getAllGyms, getSingleGym, deleteGym, updateGym, loginGym, forgotPasswordGym } = require("../controllers/gymController");
const uploadToCloudinary = require('../middleware/uploadToCloudnary');

const router = express.Router();

router.post("/register", uploadToCloudinary('image', 1), registerGym);
router.post("/login", loginGym);
router.put("/forgotPassword", forgotPasswordGym);
router.put("/update/:id", uploadToCloudinary('image', 1), updateGym);
router.get("/", getAllGyms);
router.get("/:id", getSingleGym);
router.delete("/:id", deleteGym);

module.exports = router;
