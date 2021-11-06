import patients from "../data/patients";
import {v1 as uuid} from 'uuid'
import { Patient, NonSensitivePatientInformation, NewPatientEntry, EntryWithoutId, Entry } from "../types";

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

const addPatientEntry = (healthCheckEntry: EntryWithoutId, id: string): Entry => {
  const newHealthcheckEntry = {
    id: uuid(),
    ...healthCheckEntry
  };

  const patient = patients.find(p => p.id === id);
  if (patient != undefined) {
    patient.entries.push(newHealthcheckEntry);
  };

  return newHealthcheckEntry;
};

export default {
  getPatients,
  getNonSensitiveInformation,
  addPatient,
  findById,
  addPatientEntry
};