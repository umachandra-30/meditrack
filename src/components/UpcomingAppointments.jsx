import { useEffect, useState } from "react";
import API from "../api/axios";
import useAuth from "../hooks/useAuth";

const UpcomingAppointments = ({ reload }) => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!user?.patientId) return;

    API.get(`/appointments/${user.patientId}`)
      .then((res) => setAppointments(res.data))
      .catch((err) => console.log("FETCH ERROR:", err));
  }, [user?.patientId, reload]); 

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="text-lg font-semibold mb-3">Upcoming Consultations</h2>

      {appointments.length === 0 && (
        <p className="text-gray-600">No upcoming appointments</p>
      )}

      {appointments.map((appt, index) => (
        <div key={index} className="border-b py-2">
          <p><b>Doctor:</b> {appt.doctor}</p>
          <p><b>Hospital:</b> {appt.hospital}</p>
          <p><b>Date:</b> {appt.date}</p>
          <p><b>Time:</b> {appt.time}</p>
        </div>
      ))}
    </div>
  );
};

export default UpcomingAppointments;
