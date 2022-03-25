import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import fe from 'fs-extra';

import {MongoClient} from 'mongodb';

import {dirname} from 'path';
import {fileURLToPath} from 'url';

const app = express();
const URL = `mongodb+srv://${process.env.DB_USER}:${process.env.PASSWD}@${process.env.DB_NAME}.z6bd2.mongodb.net/Cluster0?retryWrites=true&w=majority`;
const client = new MongoClient(URL, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.static(dirname(fileURLToPath(import.meta.url)) + '/public'))
const db = client.db("Homie");

app.get('/',(req, res) => {
  res.json('Hello there')
});

app.listen(1234);
