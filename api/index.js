import qs from 'qs';
import axios from 'axios';
import express from 'express';
import bodyParser from 'body-parser';
import formidable from 'formidable';
import FormData from 'form-data';
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

app.post('/image', async (req, res) => {
  const db = await connectDB();
  if (!db) {
    res.sendStatus(500);
    return;
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    try {
      const author = fields.author;
      const dirName = fields.directory;
      const guildId = fields.guildId;
      const directory = await Directory.findOne(
        { name: dirName, guildId: guildId },
      ).exec();

      const sendImageToImgur = async file => {
        const data = qs.stringify({
          image: file,
          type: 'base64',
        });

        return await axios.post('https://api.imgur.com/3/image', data, {
          headers: {
            'Authorization': `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }).then(response => response.data.data)
          .catch(e => {
            console.error(e.response);
          });
      }

      let i = 0;
      const uploadFiles = [];
      while (fields[i]) {
        uploadFiles.push(sendImageToImgur(fields[i]));
        i++;
      }
      const uploadResults = await Promise.all(uploadFiles);

      const results = uploadResults.map((result, idx) => {
        if (!result) return null;

        const fileName = fields[`${idx}-name`];
        if (!fileName) return null;

        const image = {
          id: result.id,
          name: fileName,
          size: result.size,
          url: result.link,
          deletehash: result.deletehash,
          author,
        }

        directory.images.push(image);
        return image;
      });

      directory.save();

      res.json(results);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });
});

app.delete('/image', async (req, res) => {
  const db = await connectDB();
  if (!db) {
    res.sendStatus(500);
    return;
  }

  const params = req.body;

  const directory = await Directory.findOne(
    { name: params.dirName, guildId: params.guildId },
  ).exec();

  const imgIndex = directory.images.findIndex(image => image.id === params.imgId);
  directory.images.splice(imgIndex, 1);
  directory.save()
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});

app.patch('/image', async (req, res) => {
  const db = await connectDB();
  if (!db) {
    res.sendStatus(500);
    return;
  }

  const params = req.body;

  const directory = await Directory.findOne(
    { name: params.dirName, guildId: params.guildId },
  ).exec();

  const image = directory.images.find(image => image.id === params.imgId);
  image.name = params.newName;
  directory.save()
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});

// export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
