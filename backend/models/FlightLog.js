const mongoose = require("mongoose");

const flightLogSchema = new mongoose.Schema(
  {
    pilot: {
      type: String,
      required: true,
    },
    aircraft: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FlightLog", flightLogSchema);