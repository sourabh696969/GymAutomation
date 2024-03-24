const express = require("express");
const router = express.Router();

router.use("/admin", require("./adminRoute"));
router.use("/gym", require("./gymRoute"));
router.use("/plan", require("./planRoute"));
router.use("/support", require("./supportRoute"));
router.use("/notification", require("./adminNotificationRoute"));
router.use("/notification/subAdmin", require("./subAdminNotificationRoute"));
router.use("/user", require("./userRoute"));

module.exports = router;
