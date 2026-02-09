const mongoose=require("mongoose");
const appointmentSchema=new mongoose.Schema({
patientId: String,
  name: String,
  phone: String,
  hospital: String,
  doctor: String,
  date: String,
  time: String
});
module.exports=mongoose.model("Appointment",appointmentSchema);