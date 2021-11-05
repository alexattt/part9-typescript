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

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient
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
  addPatient,
  findById
};