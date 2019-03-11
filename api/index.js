import express from 'express';
import bodyParser from 'body-parser';
import connectDB from '../assets/connectDB';
import Directory from '../models/directory';

const app = express();

// CORS
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/dir', async (req, res) => {
  const db = await connectDB();
  if (!db) {
    res.sendStatus(500);
    return;
  }

  const params = req.body;

  Directory.updateOne(
    { name: params.dirName, guildId: params.guildId },
    {},
    { upsert: true }
  ).exec()
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});

app.delete('/dir', async (req, res) => {
  const db = await connectDB();
  if (!db) {
    res.sendStatus(500);
    return;
  }

  const params = req.body;

  Directory.findOneAndRemove(
    { name: params.dirName, guildId: params.guildId },
  ).exec()
  .then(() => res.sendStatus(200))
  .catch(() => res.sendStatus(500));
});

// export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
