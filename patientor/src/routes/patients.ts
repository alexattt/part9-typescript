import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';
const router = express.Router();

router.get('/:id', (_req, res) => {
  const patient = patientService.findById(_req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/:id/entries', (_req, res) => {
  try {
    const newHealthcheckEntry = _req.body;
    const addedHealthcheckEntry = patientService.addPatientEntry(newHealthcheckEntry, _req.params.id);
    console.log(addedHealthcheckEntry);
    res.json(addedHealthcheckEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.'
    if(error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
})

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveInformation());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    console.log(addedEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.'
    if(error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
})

export default router;