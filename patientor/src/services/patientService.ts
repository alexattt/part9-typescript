import patients from "../data/patients";
import {v1 as uuid} from 'uuid'

import { Patient, NonSensitivePatientInformation, NewPatientEntry } from "../types";

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

const addPatient = ( entry: NewPatientEntry ): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitiveInformation,
  addPatient
};