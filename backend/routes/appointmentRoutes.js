const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// Create new appointment
router.post("/book", async (req, res) => {
  try {
    const { patientId, doctor, hospital, date, time } = req.body;

    const newAppointment = await Appointment.create({
      patientId,
      doctor,
      hospital,
      date,
      time,
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Booking failed", error: error.message });
  }
});

// Get all appointments for a patient
router.get("/:patientId", async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const appointments = await Appointment.find({ patientId });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Fetch failed", error: error.message });
  }
});

module.exports = router;
