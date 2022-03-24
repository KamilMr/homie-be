import express from 'express';
import fe from 'fs-extra';
import {dirname} from 'path';
import {fileURLToPath} from 'url';

const app = express();

app.use(express.static(dirname(fileURLToPath(import.meta.url)) + '/public'))

app.get('/',(req, res) => {
  res.sendFile('index.html', {root: dirname(fileURLToPath(import.meta.url))});
});

app.listen(1234);
