import express from 'express';
import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients'
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diagnosis', diagnoseRouter);

app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});