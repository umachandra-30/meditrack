import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import API from "../api/axios";

const hospitals = [
  { name: "City Care Hospital", doctors: ["Dr. Ramesh", "Dr. Anita"] },
  { name: "Sunshine Medical Center", doctors: ["Dr. Kumar", "Dr. Priya"] },
  { name: "Global Health Clinic", doctors: ["Dr. Varun", "Dr. Sneha"] }
];

const BookAppointmentPopup = ({ user, onClose, onBooked }) => {
  const [hospital, setHospital] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async () => {
    if (!hospital || !doctor || !date || !time) {
      alert("Please fill all details before booking.");
      return;
    }

    try {
      // 🔥 Save appointment to backend
  

await API.post("/appointments/book", {
  patientId: user.patientId,
  doctor,
  hospital,
  date,
  time,
});


      Swal.fire({
        icon: "success",
        title: "Appointment Booked!",
        text: `Your appointment with ${doctor} is confirmed.`,
        confirmButtonText: "OK",
      }).then(() => {
        onBooked(); 
        onClose();  
      });

    } catch (err) {
      console.log("BOOK ERROR:", err);
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: "Please try again later.",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">

        <h2 className="text-xl font-semibold mb-4">Book Appointment</h2>

        <input
          type="text"
          value={user.name}
          disabled
          className="w-full border p-2 rounded mb-2 bg-gray-200"
        />

        <input
          type="text"
          value={user.phone}
          disabled
          className="w-full border p-2 rounded mb-2 bg-gray-200"
        />

        <select
          className="w-full border p-2 rounded mb-2"
          onChange={(e) => setHospital(e.target.value)}
        >
          <option value="">Select Hospital</option>
          {hospitals.map((h) => (
            <option key={h.name} value={h.name}>{h.name}</option>
          ))}
        </select>

        {hospital && (
          <select
            className="w-full border p-2 rounded mb-2"
            onChange={(e) => setDoctor(e.target.value)}
          >
            <option value="">Select Doctor</option>
            {hospitals
              .find((h) => h.name === hospital)
              .doctors.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
          </select>
        )}

        <input
          type="date"
          className="w-full border p-2 rounded mb-2"
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="time"
          className="w-full border p-2 rounded mb-4"
          onChange={(e) => setTime(e.target.value)}
        />

        <div className="flex justify-between">
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Book
          </button>
        </div>

      </div>
    </div>
  );
};

export default BookAppointmentPopup;
