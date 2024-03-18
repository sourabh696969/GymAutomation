const express = require("express");
const {
  createNotificationForGym,
  createNotificationForAllGyms,
  updateNotificationStatusOfGym,
  getUnreadNotificationOfGyms,
  getReadNotificationOfGyms,
  getSingleNotificationOfGym,
  deleteSingleNotificationOfGym,
} = require("../controllers/notificationController");

const router = express.Router();

router.post("/gym/create", createNotificationForGym);
router.post("/gym/createForAll", createNotificationForAllGyms);
router.patch("/gym/update/:id", updateNotificationStatusOfGym);
router.get("/gym/unread/:id", getUnreadNotificationOfGyms);
router.get("/gym/read/:id", getReadNotificationOfGyms);
router.get("/gym/single/:id", getSingleNotificationOfGym);
router.delete("/gym/delete/:id", deleteSingleNotificationOfGym);

module.exports = router;
