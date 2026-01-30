import { useNavigate } from "react-router-dom";
const UpcomingAppointments=()=>
{
    const user=JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    return(
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
            <div className="flex justify-between items-center mb-4">
             <h2 className="text-lg font-semibold">Upcoming Appointments</h2>
            <button className="text-sm text-pink-600 hover:underline"
             onClick={() => navigate(`/patient/${user.patientId}/appointments`)}>View All</button>
            </div>
        <div className="p-1">
            <h3 className="font-semibold text-gray-800 mb-3">
                Anti-Aging Consulation
            </h3>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
                <span>Dr.Uma Chandra</span>
            </div>
            <span>02-17-2025</span>
            <span>11:00 AM -11:30 AM</span>
        </div>
         <div className="flex gap-3 mt-4">
          <button className="border border-red-400 text-red-500 px-4 py-2 rounded-lg text-sm hover:bg-red-50">
            Cancel Appointment
          </button>

          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
            Reschedule
          </button>
        </div>
        </div>
        </div>
    );
};
export default UpcomingAppointments;