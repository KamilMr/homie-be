import express from 'express';
import fe from 'fs-extra';

import cors from 'cors';

import {dirname} from 'path';
import {fileURLToPath} from 'url';

import {getPatients} from './helpers/db.js';

const app = express();

const pathName = dirname(fileURLToPath(import.meta.url)) + '/public';

const corsOpt = {
  origin: 'http://localhost:3000',
}

app.use(express.static(pathName))
app.use(cors(corsOpt));

app.post('/patient', (req, res) => {
  // code here
});

app.post('/session', (req, res) => {
  // code here
});

app.delete('/session', (req, res) => {
  // code here
});

app.delete('/patient', (req, res) => {
  // code here
});

app.get('/ini',async(req, res) => {
  const patients = await getPatients();
  res.send(patients);
});
app.get('*', (res, req) => {
  res.sendFile('index.html', pathName);
})

app.listen(1234);
