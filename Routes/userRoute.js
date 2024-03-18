const express = require("express");
const uploadToCloudinary = require("../middleware/uploadToCloudnary");
const checkPlanExpiration = require("../middleware/planExpirationHandler");
const { validateUserToken } = require("../middleware/validateTokenHandler");
const {
  registerUser,
  forgotPasswordUser,
  loginUser,
  updateUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  getAllUsersForAdmin,
} = require("../controllers/userController");

const router = express.Router();

router.post(
  "/register",
  validateUserToken,
  uploadToCloudinary("image", 1),
  registerUser
);
router.post("/login", loginUser);
router.put("/forgotPassword", forgotPasswordUser);
router.put("/update/:id", uploadToCloudinary("image", 1), updateUser);
router.get("/", validateUserToken, getAllUsers);
router.get("/admin/:id", getAllUsersForAdmin);
router.get("/:id", getSingleUser);
router.delete("/:id", deleteUser);

module.exports = router;
