import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import PatientProfileCard from "./PatientProfileCard";
import DashboardCards from "../components/DashboardCards";
import UpcomingAppointments from "../components/UpcomingAppointments";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import BookAppointmentPopup from "../components/BookAppointmentPopup";

const PatientHome = () => {
  const { user } = useAuth();
  const { patientId } = useParams();
  const navigate = useNavigate();

  const [showBooking, setShowBooking] = useState(false);
  const [reloadAppointments, setReloadAppointments] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    if (user.patientId !== patientId) {
      navigate("/login", { replace: true });
    }
  }, [user, patientId, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex p-6 gap-10">

      <div className="flex-1">
        <h1 className="text-2xl font-semibold mb-1">Welcome {user.name},</h1>
        <p className="text-gray-600 mb-6">You have got no appointments for today</p>

        <DashboardCards />

        {/* Pass reload to update upcoming list */}
       <div className="mt-8">
  <UpcomingAppointments reload={reloadAppointments} />
</div>

      </div>

      <div className="flex flex-col items-end pr-6 mt-4">

        {/* Schedule + Logout */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowBooking(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow transition"
          >
            Schedule Appointment
          </button>

          <button
            onClick={() => {
              sessionStorage.clear();
              localStorage.clear();
              navigate("/login");
            }}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow transition"
            title="Logout"
          >
            <ArrowRightOnRectangleIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-6">
          <PatientProfileCard user={user} />
        </div>
      </div>

      {/* Popup */}
      {showBooking && (
        <BookAppointmentPopup
          user={user}
          onClose={() => setShowBooking(false)}
          onBooked={() => setReloadAppointments((prev) => !prev)}
        />
      )}

    </div>
  );
};

export default PatientHome;
