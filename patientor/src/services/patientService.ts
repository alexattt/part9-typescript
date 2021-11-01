import patients from "../data/patients";

import { Patient, NonSensitivePatientInformation } from "../types";

const getPatients = (): Array<Patient> => {
  return patients;
}

const getNonSensitiveInformation = (): NonSensitivePatientInformation [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default {
  getPatients,
  getNonSensitiveInformation
};