import { useNavigate } from "react-router-dom";
const DashboardCards=()=>
{
  const navigate=useNavigate();
  const user=JSON.parse(localStorage.getItem("user"));
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className=" bg-pink-100 border border-pink-100 rounded-xl p-5 hover:shaodw-md cursor-pointer transition"
             onClick={() => navigate(`/patient/${user.patientId}/appointments`)}
            >
                <div className="flex justify-between items-center mb-3">
          <span className="flex items-center  gap-2 font-semibold text-gray-800">
            Consultations
          </span>
          <span className="text-gray-500">{">"}</span>
        </div>
        <p className="text-gray-500 text-sm">Last Consultation 12.02.2026</p>
        <p className="text-gray-800 font-semibold mt-1">04 All time consultations</p>
            </div>
         <div className=" bg-purple-100 border border-purple-100 rounded-xl p-5 hover:shaodw-md cursor-pointer transition">
                <div className="flex justify-between items-center mb-3">
          <span className="flex items-center  gap-2 font-semibold text-gray-800">
            Prescriptions
          </span>
          <span className="text-gray-500">{">"}</span>
        </div>
        <p className="text-gray-500 text-sm">Last added 12.02.2026</p>
        <p className="text-gray-800 font-semibold mt-1">01 available prescription</p>
            </div>
         <div className=" bg-red-50 border border-red-100 rounded-xl p-5 hover:shaodw-md cursor-pointer transition">
                <div className="flex justify-between items-center mb-3">
          <span className="flex items-center  gap-2 font-semibold text-gray-800">
            Lab Screenings
          </span>
          <span className="text-gray-500">{">"}</span>
        </div>
        <p className="text-gray-500 text-sm">04 Lab Tests</p>
        <p className="text-gray-800 font-semibold mt-1">Cancer Screening Test</p>
            </div>
        </div>
    );
};
export default DashboardCards;
