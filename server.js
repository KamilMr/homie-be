import express from 'express';
import fe from 'fs-extra';

import cors from 'cors';

import {dirname} from 'path';
import {fileURLToPath} from 'url';

import {
  deleteClient,
  getClient,
  insertClient,
  insertSession,
} from './helpers/db.js';

const app = express();

const pathName = dirname(fileURLToPath(import.meta.url)) + '/public';

const corsOpt = {
  origin: process.env.ORIGIN,
};

//TODO: add remove session option
// TODO: reorganize DB

app.use(express.json());
app.use(express.static(pathName))
app.use(cors(corsOpt));

app.post('/client', insertClient);
app.delete('/client/:id', deleteClient);
app.post('/client/:id', insertSession);

app.delete('/session', (req, res) => {
  // code here
});

app.get('/ini',async(req, res) => {
  const patients = await getClient();
  res.send(patients);
});

// app.get('*', (res, req) => {
//   res.sendFile('index.html', pathName);
// })
app.listen(process.env.PORT);
