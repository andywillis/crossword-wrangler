const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const { readFile } = require('fs');
const { promisify } = require('util');

const promisifiedReadFile = promisify(readFile);

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
  const json = await promisifiedReadFile(filePath, 'utf8').catch(err => console.log(err));
  res.send(json);
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
});

const server = http.createServer(app);

server.listen(app.get('port'), () => {
  console.log('Listening on port', app.get('port'));
});
