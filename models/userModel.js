const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    pincode: {
      type: String,
    },
    image: {
      type: String,
    },
    gymData: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gym",
    },
    timeSlot: {
      type: String
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
