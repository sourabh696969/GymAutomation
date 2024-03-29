const mongoose = require("mongoose");

const gymSupportSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    gymData: {
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

const userSupportSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    userData: {
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

const GymSupport = mongoose.model("GymSupport", gymSupportSchema);
const UserSupport = mongoose.model("UserSupport", userSupportSchema);

module.exports = {
  GymSupport,
  UserSupport,
};
