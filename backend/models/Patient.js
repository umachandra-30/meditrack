const mongoose=require("mongoose");
const patientSchema=new mongoose.Schema({
    patientId:
    {
        type:String,
        unique:true,
    },
name:String,
email:String,
password:String,
phone:String,
createdAt:{
    type:Date,
    default:Date.now,
},
});
module.exports=mongoose.model("Patient",patientSchema);