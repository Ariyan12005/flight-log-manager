const mongoose = require("mongoose");

const flightLogSchema = new mongoose.Schema(
  {
    pilotName: {
      type: String,
      required: true,
    },

    aircraft: {
      type: String,
      required: true,
    },

    departure: {
      type: String,
      required: true,
    },

    arrival: {
      type: String,
      required: true,
    },

    flightHours: {
      type: Number,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FlightLog", flightLogSchema);