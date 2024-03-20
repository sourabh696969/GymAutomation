const mongoose = require("mongoose");

const gymSchema = mongoose.Schema({
  gymName: {
    type: String,
  },
  ownerName: {
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
  memberInGym: {
    type: String,
  },
  paymentMode: {
    type: String,
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
  },
  planUpdatedOn: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Boolean,
    default: true
  },
  ExpiryDate: {
    type: Date,
  }
},
{
  timestamps: true
});

module.exports = mongoose.model("Gym", gymSchema);
