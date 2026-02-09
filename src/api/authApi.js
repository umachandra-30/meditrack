import API from "./axios";


// Register patient
export const registerpatient = (data) => {
  return API.post("/patient/register", data);
};

// Login patient
export const loginPatient = (data) => {
  return API.post("/patient/login", data);
};

