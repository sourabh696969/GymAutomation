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

const adminNotificationSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    gymId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gym",
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
  "Notification",
  notificationSchema
);

const AdminNotification = mongoose.model(
  "AdminNotification",
  adminNotificationSchema
);

module.exports = {
  Notification,
  AdminNotification,
};
