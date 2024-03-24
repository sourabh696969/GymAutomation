const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    notification: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const subAdminNotificationSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model(
  "GymNotification",
  notificationSchema
);

const SubAdminNotification = mongoose.model(
  "SubAdminNotification",
  subAdminNotificationSchema
);

module.exports = {
  Notification,
  SubAdminNotification,
};
