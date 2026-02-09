import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const HealthRecords = () => {
  const { patientId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user.patientId !== patientId) {
      navigate("/login");
    }
  }, [user, patientId, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold mb-6">
        My Health Records
      </h1>
      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-3"> Prescribed Medicines</h2>

        {/* Empty placeholder for now */}
        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="text-gray-600">
            No medicines prescribed yet.
          </p>
        </div>
      </div>
      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-3">📄 Previous Consultation Reports</h2>
        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="text-gray-600">
            No consultation reports available.
          </p>
        </div>
      </div>

    </div>
  );
};

export default HealthRecords;
