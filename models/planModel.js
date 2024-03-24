const mongoose = require("mongoose");

const gymPlanSchema = mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: String,
  },
  duration: {
    type: String,
  },
});

const userPlanSchema = mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: String,
  },
  duration: {
    type: String,
  },
});

const GymPlan = mongoose.model("GymPlan", gymPlanSchema);
const UserPlan = mongoose.model("UserPlan", userPlanSchema);

module.exports = {
  GymPlan,
  UserPlan
}
