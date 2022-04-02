import dotenv from 'dotenv';
dotenv.config();
import {MongoClient} from 'mongodb';

const USER = process.env.DB_USER;
const DB_NAME = process.env.DB_NAME;
const PASSWD = process.env.PASSWD;
const COLLECTION = process.env.COLLECTION;

const URL = `mongodb+srv://${USER}:${PASSWD}@cluster0.z6bd2.mongodb.net/${DB_NAME}retryWrites=true&w=majority`;

const client = new MongoClient(URL, {useNewUrlParser: true, useUnifiedTopology: true});

const connect = async() => {
  try {
    const db = await client.connect();
    const d = db.db(DB_NAME);
    return d;
  }catch (error){
    console.log(error)
    return;
  }
};

export const getPatients = async() => {
  try {
    const db = await connect();
    const p = db.collection(COLLECTION);
    const tR = await p.find().toArray();
    return tR;

  }catch(error) {
    console.log(error)
    return;

  }

};

