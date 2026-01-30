const express=require("express");
const router=express.Router();
const{
    registerpatient,
    loginPatient,
}=require("../controllers/patientController");
router.post("/register",registerpatient);
router.post("/login",loginPatient);
module.exports=router;