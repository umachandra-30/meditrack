import {useState} from "react";
import { loginPatient } from "../../api/authApi";
import useAuth from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";


const Login =()=>
{
    const navigate =useNavigate();
  useEffect(() => {
  const token = sessionStorage.getItem("token");
  const user = sessionStorage.getItem("user");

  if (token && user) {
    const parsedUser = JSON.parse(user);
    navigate(`/patient/${parsedUser.patientId}`, { replace: true });
  }
}, [navigate]);

    const {login}=useAuth();
    const[PatientData,setPatientData]=useState({
        patientId:"",
        password:"",
    });
    const handleChange = (e) => {
    setPatientData({
      ...PatientData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async(e)=>
  {
    e.preventDefault();
    try{
        const res=await loginPatient(PatientData);
        login(res.data.user,res.data.token);
        Swal.fire({
          icon:"success",
          title:"Login Successful",
          text:`Welcome ${res.data.user.name}`,
          confirmButtonText:"Continue",
        }).then(()=>
        {
          navigate(`/patient/${res.data.user.patientId}`);
        });
    }
    catch(error)
    {
       Swal.fire({
        icon:"error",
        title:"Login Failed",
        text:"Invalid Patient Id or Password"
       });
    }
  };
  return(
  <div className="flex  items-center justify-center min-h-screen bg-black">
    <form
    onSubmit={handleSubmit}
      className="bg-transparent shadow-md rounded-lg p-8 w-full max-w-md"
    >
      <h2 className="text-3xl font-bold mb-5 text-center text-white ">Patient Login</h2>
      <input
        type="text"
        name="patientId"
        placeholder="Patient ID (e.g., PAT-20XX-XXXX)"
        value={PatientData.patientId}
        onChange={handleChange}
        required
        className="w-full text-white bg-gray-900 p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={PatientData.password}
        onChange={handleChange}
        required
        className="w-full text-white bg-gray-900 p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
       <button
        type="submit"
        className="w-full bg-red-600 text-white py-3 rounded transition-all"
      >
        Login
      </button>
      <div className="flex justify-end">
 <div className="flex justify-end">
    <p className="text-white m-3">
        Dont have an account?{" "}
        <span className="underline cursor-pointer text-white" 
        onClick={()=>navigate("/register")}
        >
            Register here!
        </span>
     </p>
   </div>
</div>

    </form>
  </div>
);

  

};
export default Login;