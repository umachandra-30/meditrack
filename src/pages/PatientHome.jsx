import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import PatientProfileCard from "./PatientProfileCard";
import DashboardCards from "../components/DashboardCards";
import UpcomingAppointments from "../components/UpcomingAppointments";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";


const PatientHome = () => {
  const { user } = useAuth();
  const { patientId } = useParams();
  const navigate = useNavigate();

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
        <UpcomingAppointments/>
      </div>

<div className="flex flex-col items-end pr-6 mt-4">
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

  {/* Profile Card */}
  <div className="mt-6">
    <PatientProfileCard user={user} />
  </div>

</div>


    </div>
   
  );
};
 
export default PatientHome;
