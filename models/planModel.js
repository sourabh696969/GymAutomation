const mongoose = require("mongoose");

const planSchema = mongoose.Schema({
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

module.exports = mongoose.model("Plan", planSchema);
