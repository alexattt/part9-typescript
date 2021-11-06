import { NewPatientEntry, Entry } from "./types";

type Fields = { 
  name : unknown, 
  dateOfBirth: unknown, 
  ssn: unknown, 
  gender: unknown, 
  occupation: unknown,
  entries: Array<Entry> | []
};

export enum Gender {
  Other = 'Other',
  Male = 'Male',
  Female = 'Female'
};

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseName = (name: unknown): string => {
  console.log(typeof name);
  if (!name || !isString(name) || (/\d/.test(name))) {
    throw new Error('Incorrect format or name is missing!');
  }

  return name;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect format or SSN is missing!');
  }

  return ssn;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): string => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect format or occupation is missing!');
  }

  return occupation;
};

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation, entries } : Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: entries
  };

  return newEntry;
};

export default toNewPatientEntry;