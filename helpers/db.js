import dotenv from 'dotenv';
dotenv.config();
import {MongoClient, ObjectId} from 'mongodb';

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

export const insertSession = async (req, res)=> {
  const session = req.body;
  const id = req.params.id;

  const db = await connect();
  const p = db.collection(COLLECTION);

  const patient = await p.updateOne({_id: ObjectId(id)},
    {$push:{
      'session': session
    }});
  console.log(session)
  res.send(patient)
};

export const insertPatient = async (req, res)=> {
  const patient = req.body;
  if(!patient) res.json({d: null, err: 'no patient'})
  try {
    const db = await connect();
    const p = db.collection(COLLECTION);
    const tR = await p.insertOne(patient);
    res.send('ok')

  }catch(error) {
    console.log(error)
    return;
  }
};

export const deletePatient = async(req, res) => {
  const id = req.params.id;
  const db = await connect();
  const p = db.collection(COLLECTION);
  try {
    const r = await p.deleteOne({_id: ObjectId(id)});
    if(r.deletedCount > 0) res.send('file: ' + id + ' deleted')
    else res.send(r.deletedCount + ' file deleted')

  }catch(error) {
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

