const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const { pathExists, readFile } = require('./lib/io');
const { getCrossword } = require('./crossword');

const app = express();
app.store = {};

const applicationName = 'crossword-wrangler';

app.set('port', (process.env.PORT || 3000));
app.set('root', __dirname);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../../dist')));

app.get('/crossword/:type/:id', async (req, res) => {
  const { type, id } = req.params;
  const filePath = path.join(__dirname, `data/${type}/${type}_${id}.json`);

  try {

    if (!await pathExists(filePath)) {
      await getCrossword(type, id);
    }

    const crosswordJSON = await readFile(filePath);
    const resJSON = JSON.stringify([null, JSON.parse(crosswordJSON)]);
    res.send(resJSON);

  } catch (err) {
    res.send(JSON.stringify([err]));
  }

});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
});

const server = http.createServer(app);

server.listen(app.get('port'), () => {
  console.log(`${applicationName} listening on port ${app.get('port')}`);
});
