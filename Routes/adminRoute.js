const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  forgotPasswordAdmin,
  getLengthOfData,
} = require("../controllers/adminController");

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.put("/forgotPassword", forgotPasswordAdmin);
router.get("/totalCounts", getLengthOfData);

module.exports = router;
