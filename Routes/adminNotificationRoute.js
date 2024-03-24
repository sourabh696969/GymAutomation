const express = require("express");
const {
  createNotificationForGym,
  createNotificationForAllGyms,
  updateNotificationStatusOfGym,
  getUnreadNotificationOfGyms,
  getReadNotificationOfGyms,
  getSingleNotificationOfGym,
  deleteSingleNotificationOfGym,
  deleteUnreadNotificationGym,
  getNotificationOfGymsAdmin,
  updateNotificationStatus,
  getUnreadNotification,
  getReadNotification,
  deleteNotificationById,
  deleteUnreadNotification,
} = require("../controllers/adminNotificationController");

const router = express.Router();

///// Admin Notification Routes /////
router.patch("/update/:id", updateNotificationStatus);
router.get("/unread", getUnreadNotification);
router.get("/read", getReadNotification);
router.delete("/delete/:id", deleteNotificationById);
router.delete("/unread", deleteUnreadNotification);

///// Admin Notification To Gym Routes /////
router.post("/gym/create", createNotificationForGym);
router.post("/gym/createForAll", createNotificationForAllGyms);
router.patch("/gym/update/:id", updateNotificationStatusOfGym);
router.get("/gym/unread/:id", getUnreadNotificationOfGyms);
router.get("/gym/read/:id", getReadNotificationOfGyms);
router.get("/gym/single/:id", getSingleNotificationOfGym);
router.get("/gym/all", getNotificationOfGymsAdmin);
router.delete("/gym/delete/:id", deleteSingleNotificationOfGym);
router.delete("/gym/delete/unread", deleteUnreadNotificationGym);

module.exports = router;
