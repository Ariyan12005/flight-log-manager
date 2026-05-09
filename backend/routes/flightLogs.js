const express = require("express");
const FlightLog = require("../models/FlightLog");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const logs = await FlightLog.find();
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching logs" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newLog = new FlightLog(req.body);

    const savedLog = await newLog.save();

    res.status(201).json(savedLog);
  } catch (error) {
    res.status(400).json({ message: "Error creating log" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await FlightLog.findByIdAndDelete(req.params.id);

    res.json({ message: "Log deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting log" });
  }
});
module.exports = router;