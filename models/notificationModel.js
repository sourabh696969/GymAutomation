const mongoose = require("mongoose");

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

const AdminNotification = mongoose.model(
  "AdminNotification",
  adminNotificationSchema
);

module.exports = {
  AdminNotification,
};
