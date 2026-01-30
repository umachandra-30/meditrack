const Patient = require("../models/Patient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateId = async () => {
  const count = await Patient.countDocuments();
  return `PAT-2026-${String(count + 1).padStart(4, "0")}`;
};


exports.registerpatient = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: "Patient already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const generatedPatientId = await generateId();

    // Save patient
    const patient = await Patient.create({
      patientId: generatedPatientId,
      name,
      email,
      password: hashedPassword,
      phone,
    });

    res.status(201).json({
      message: "Registration successful",
      patientId: patient.patientId,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};

// LOGIN PATIENT (using Patient ID)
exports.loginPatient = async (req, res) => {
  try {
    const { patientId, password } = req.body;

    const patient = await Patient.findOne({ patientId });
    if (!patient) {
      return res.status(400).json({ message: "Invalid Patient ID" });
    }

    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: patient._id, patientId: patient.patientId },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        patientId: patient.patientId,
        name: patient.name,
        email: patient.email,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};
