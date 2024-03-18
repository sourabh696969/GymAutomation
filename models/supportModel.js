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

const GymSupport = mongoose.model("GymSupport", gymSupportSchema);

module.exports = {
  GymSupport,
};
