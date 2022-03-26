import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import fe from 'fs-extra';

import {MongoClient} from 'mongodb';

import {dirname} from 'path';
import {fileURLToPath} from 'url';

const app = express();

const USER = process.env.DB_USER;
const DB_NAME = process.env.DB_NAME;
const PASSWD = process.env.PASSWD;
const URL = `mongodb+srv://${USER}:${PASSWD}@${DB_NAME}.z6bd2.mongodb.net/Cluster0?retryWrites=true&w=majority`;
const client = new MongoClient(URL, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.static(dirname(fileURLToPath(import.meta.url)) + '/public'))
const db = client.db(DB_NAME);

app.get('/',(req, res) => {
  res.json(
    {
      msg: 'Im Homie',
      d: db.namespace,
  })
});

app.listen(1234);
