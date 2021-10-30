import express from 'express';
const app = express();
app.use(express.json())
import { calculateBmi } from './ts-exercises/bmiCalculator'
import {exerciseCalculator} from './ts-exercises/exerciseCalculator'

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
  if (_req.query.height && _req.query.weight) {
    res.send(calculateBmi(Number(_req.query.height), Number(_req.query.weight)));
  }
  else {
    res.send({"error": "Malformatted parameters"});
  }
});

app.post('/exercises', ((_req, res) => {
  const parameters = _req.body;
  let areIntegers = true;

  for (let i=0;i<parameters.daily_exercises.length;i++) {
    if (typeof parameters.daily_exercises[i] !== 'number') {
      areIntegers = false;
    }
  }

  if (parameters.target == undefined || parameters.daily_exercises === undefined) {
    res.send({"error": "parameter or parameters missing"});
  } 
  else if (!(typeof parameters.target === 'number') || !(typeof parameters.daily_exercises === 'object')) {
    res.send({"error": "malformatted parameters"});
  }
  else if (!areIntegers) {
    res.send({"error": "malformatted parameters - exercise hour array is wrong"});
  }
  else {
    res.send(exerciseCalculator(parameters.daily_exercises, parameters.target));
  }
}));

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});