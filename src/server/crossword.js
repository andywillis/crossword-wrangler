const request = require('request-promise-native');
const { promisify } = require('util');
const path = require('path');
const log = require('single-line-log').stdout;
const { parseString } = require('xml2js');

const { writeFile, pathExists, addFolder } = require('./lib/io');

const xmlParseString = promisify(parseString);
const root = path.join(__dirname);
const dataPath = path.join(root, 'data');

(async () => {
  if (!await pathExists(dataPath)) {
    await addFolder(dataPath);
  }
})();

const uri = 'https://ams.cdn.arkadiumhosted.com/assets/gamesfeed/evening-standard/daily-crossword/';

function getClues(obj) {
  const { title, clue: cluesArr } = obj;
  const label = title[0].b[0];
  const clues = cluesArr.map((o) => {
    const { _: clue, $: meta } = o;
    return { clue, meta };
  });
  return { label, clues };
}

function restructureData(data) {
  const { crossword } = data['crossword-compiler']['rectangular-puzzle'][0];
  const { grid, word, clues: cluesArr } = crossword[0];
  const { $: { width, height }, cell } = grid[0];

  const squares = cell.map(o => o.$);
  const words = word.map(o => o.$);

  const clues = {};
  const clueSet1 = getClues(cluesArr[0]);
  const clueSet2 = getClues(cluesArr[1]);
  clues[clueSet1.label.toLowerCase()] = clueSet1.clues;
  clues[clueSet2.label.toLowerCase()] = clueSet2.clues;

  return { width, height, squares, words, clues };
}

async function processLink(link, type, filePath) {
  const filename = link.split('/').pop().replace('xml', 'json');
  const uri = path.join(filePath, filename);

  // Request the links from the ES, parse the XML to JSON
  // restructure the JSON into something more managable,
  // then save it to disc.
  if (await pathExists(uri)) {
    console.log(`Skipping: ${uri}`);
  } else {
    try {
      const res = await request(link);
      const data = await xmlParseString(res);
      const xwordObj = restructureData(data);
      const json = JSON.stringify(xwordObj);

      await writeFile(uri, json);
      log(`Saved: ${uri}`);
    } catch (err) {
      console.error(err.statusCode);
    }
  }

}

async function getCrossword(type, id) {
  const filePath = path.join(root, 'data', type);

  if (!await pathExists(filePath)) {
    await addFolder(filePath);
  }

  await processLink(`${uri}${type}_${id}.xml`, type, filePath);
}

module.exports = {
  getCrossword
};
