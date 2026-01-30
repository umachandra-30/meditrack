import { useState } from "react";
import { registerpatient } from "../../api/authApi";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";

const Register =()=>
{
    const navigate =useNavigate();
    useEffect(() => {
  const token =sessionStorage.getItem("token");
  const user =sessionStorage.getItem("user");

  if (token && user) {
    const parsedUser = JSON.parse(user);
    navigate(`/patient/${parsedUser.patientId}`, { replace: true });
  }
}, [navigate]);

    const [PatientData,setPatientData]=useState({
        name:"",
        email:"",
        password:"",
        phone:"",

    });

 const [patientId,setPatientId]=useState(null);
 const handleChange=(e)=>
{
    setPatientData({
        ...PatientData,
        [e.target.name]:e.target.value,
    });
};
const handleSubmit=async (e)=>
{
    e.preventDefault();
    try{
        const res=await registerpatient(PatientData);
        setPatientId(res.data.patientId);
        Swal.fire({
                 icon:"success",
                 title:"Registration Successful",
                 text:`Welcome ${res.data.patientId}`,
                 confirmButtonText:"Continue",
               }).then(()=>
               {
                 navigate("/login");
               });
    }catch(error)
    {
      Swal.fire({
        icon:"error",
        text:"Sonething went wrong!!",
        confirmButtonText:"Continue",
      }).then(()=>
    {
        navigate("/register")
    });
    }
};
 return (
<div className="flex items-center justify-center min-h-screen bg-black">
  <form
  onSubmit={handleSubmit}
  className="bg-transparent shadow-md rounded-lg p-8 w-full max-w-md">
    <h2 className="text-3xl font-bold mb-5 text-center text-white ">Patient Login</h2>
    <input
    type="text"
    name="name"
    placeholder="Full Name"
    onChange={handleChange}
    className="w-full text-white bg-gray-900 p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
   />
   <input
    type="email"
    name="email"
    placeholder="Email"
    onChange={handleChange}
    className="w-full text-white bg-gray-900 p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
   />
   <input
    type="password"
    name="password"
    placeholder="Password"
    onChange={handleChange}
    className="w-full text-white bg-gray-900 p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
   />
   <input
    type="text"
    name="phone"
    placeholder="Phone Number"
    onChange={handleChange}
    className="w-full text-white bg-gray-900 p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
   />
    <button
        type="submit"
        className="w-full bg-red-600 text-white py-3 rounded transition-all"
      >
        Register
   </button>
   <div className="flex justify-end">
    <p className="text-white m-3">
        Already registered with us?{" "}
        <span className="underline cursor-pointer text-white" 
        onClick={()=>navigate("/login")}
        >
            Log in to ur account
        </span>
     </p>
   </div>
    </form>
</div> 
);
};
export default Register;