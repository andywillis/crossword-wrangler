const request = require('request-promise-native');
const { promisify } = require('util');
const path = require('path');
const log = require('single-line-log').stdout;
const createThrottle = require('async-throttle');
const { parseString } = require('xml2js');

const { logError, writeFile, pathExists, addFolder } = require('./io');
const { getWeekDayCalendar } = require('./calendar');

const throttle = createThrottle(2);
const xmlParseString = promisify(parseString);

const uris = { easy: [], quick: [] };
const uri = 'https://ams.cdn.arkadiumhosted.com/assets/gamesfeed/evening-standard/daily-crossword/';

uris.easy = getWeekDayCalendar(2018).map(date => `${uri}easy_${date}.xml`);
uris.quick = getWeekDayCalendar(2018).map(date => `${uri}quic_${date}.xml`);

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

async function processLink(link, index, type, filePath) {
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
      log(`Saved ${index}/${uris[type].length} ${uri}`);
    } catch (err) {
      console.error(err.statusCode);
    }
  }

}

async function getCrosswords(type, id) {
  const root = path.join(__dirname);

  const dataPath = path.join(root, 'data');

  if (!await pathExists(dataPath)) {
    await addFolder(dataPath);
  }

  const filePath = path.join(root, 'data', type);

  if (!await pathExists(filePath)) {
    await addFolder(filePath);
  }

  if (id) {
    await processLink(`${uri}${type}_${id}.xml`, 0, type, filePath);
  } else {
    uris[type].forEach((link, index) => {
      throttle(() => processLink(link, index, type, filePath));
    });
  }    

}

(async () => {
  await getCrosswords('easy');
  await getCrosswords('quick');
})();
