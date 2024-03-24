const express = require("express");
const {
  createNotificationForUser,
  createNotificationForAllUsers,
  updateNotificationStatusOfUser,
  getUnreadNotificationOfUsers,
  getReadNotificationOfUsers,
  getSingleNotificationOfUser,
  deleteSingleNotificationOfUser,
  deleteUnreadNotificationUser,
  getNotificationOfUsersSubAdmin,
  updateNotificationStatus,
  getUnreadNotification,
  getReadNotification,
  deleteNotificationById,
  deleteUnreadNotification,
} = require("../controllers/subAdminNotificationController");

const router = express.Router();

///// SubAdmin Notification Routes /////
router.patch("/update/:id", updateNotificationStatus);
router.get("/unread", getUnreadNotification);
router.get("/read", getReadNotification);
router.delete("/delete/:id", deleteNotificationById);
router.delete("/unread", deleteUnreadNotification);

///// SubAdmin Notification To User Routes /////
router.post("/create", createNotificationForUser);
router.post("/createForAll", createNotificationForAllUsers);
router.patch("/user/update/:id", updateNotificationStatusOfUser);
router.get("/unread/:id", getUnreadNotificationOfUsers);
router.get("/read/:id", getReadNotificationOfUsers);
router.get("/single/:id", getSingleNotificationOfUser);
router.get("/all", getNotificationOfUsersSubAdmin);
router.delete("/user/delete/:id", deleteSingleNotificationOfUser);
router.delete("/delete/unread", deleteUnreadNotificationUser);

module.exports = router;
