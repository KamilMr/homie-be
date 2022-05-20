import dotenv from 'dotenv';
dotenv.config();
import {MongoClient, ObjectId} from 'mongodb';
import {validClient, validSession} from './validation.js';

const USER = process.env.DB_USER;
const DB_NAME = process.env.DB_NAME;
const PASSWD = process.env.PASSWD;
const COLLECTION = process.env.COLLECTION;

const URL = `mongodb+srv://${USER}:${PASSWD}@cluster0.z6bd2.mongodb.net/${DB_NAME}retryWrites=true&w=majority`;

const client = new MongoClient(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connect = async() => {
  try {
    const db = await client.connect();
    const d = db.db(DB_NAME);
    return d;
  }catch (err){
    console.log(err)
    return;
  }
};

const insertSession = async (req, res)=> {
  const id = req.params.id;
  try{
    await validSession.validateSync(req.body);
    res.send({msg: 'ok'});
  }catch(err) {
    console.log(err);
    return res.send({msg: 'validation_err'});
  }

  const db = await connect();
  const p = db.collection(COLLECTION);

  const patient = await p.updateOne({_id: ObjectId(id)},
    {$push:{
      'session': req.body,
    }});
  console.log(req.body)
  res.send(patient)
};

const insertClient = async (req, res)=> {

  try{
    await validClient.validateSync(req.body);
    res.send({msg: 'ok'});
  }catch(err) {
    console.log(err);
    return res.send({msg: 'validation_err'});
  }

  if(!req.body) res.json({d: null, err: 'no patient'})
  try {
    const db = await connect();
    const p = db.collection(COLLECTION);
    const tR = await p.insertOne(req.body);
    res.send({msg: 'ok'})
  }catch(err) {
    console.log(err)
    return;
  }
};

const deleteClient = async(req, res) => {
  const id = req.params.id;
  const db = await connect();
  const p = db.collection(COLLECTION);
  try {
    const r = await p.deleteOne({_id: ObjectId(id)});
    if(r.deletedCount > 0) res.send({msg: 'file: ' + id + ' deleted'})
    else res.send({msg: r.deletedCount + ' file deleted'})

  }catch(err) {
    console.log(err)
    return;
  }
};

const getClient = async() => {
  try {
    const db = await connect();
    const p = db.collection(COLLECTION);
    const tR = await p.find().toArray();
    return tR;

  }catch(err) {
    console.log(err)
    return;
  }
};

export {
  deleteClient,
  getClient,
  insertClient,
  insertSession,
};

