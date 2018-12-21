const request = require('request-promise-native');
const { mkdir, writeFile } = require('fs');
const { promisify } = require('util');
const path = require('path');
const log = require('single-line-log').stdout;

const createThrottle = require('async-throttle');
const { parseString } = require('xml2js');

const throttle = createThrottle(2);
const promisifiedParseString = promisify(parseString);
const promisifiedWriteFile = promisify(writeFile);
const promisifiedMkdir = promisify(mkdir);

const uris = { easy: [], quick: [] };
const uri = 'https://ams.cdn.arkadiumhosted.com/assets/gamesfeed/evening-standard/daily-crossword/';

function padNumber(n) {
  const s = n.toString();
  return s.length === 1 ? `0${s}` : s;
}

function getWeekDayCalendar(year) {
  const arr = [];
  for (let m = 1; m <= 12; m++) {

    // JS is messy - to get the number of days in a month
    // use the actual month number (starting from index 1)
    const date = new Date(year, m, 0);
    const daysInMonth = date.getDate();
    for (let d = 1; d <= daysInMonth; d++) {

      // ...but to get the day of the week
      // you need to use a zero-index month!
      const date = new Date(year, m - 1, d);
      const dayNumber = date.getDay();
      if (dayNumber > 0 && dayNumber < 6) {
        arr.push(`${year.toString().slice(2)}${padNumber(m)}${padNumber(d)}`);
      }
    }
  }
  return arr;
}

uris.easy = getWeekDayCalendar(2018).map(date => `${uri}easy_${date}.xml`);
uris.quick = getWeekDayCalendar(2018).map(date => `${uri}quic_${date}.xml`);

function logError(err) {
  console.log(err.message);
}

// function verifyFolderExists(path) {
//   return new Promise(async (resolve) => {
//     await promisifiedMkdir(path).catch(logError);
//     resolve();
//   });
// }

function addFolder(root, folderName) {
  return new Promise(async (resolve) => {
    const filePath = `${root}/data/${folderName}`;
    await promisifiedMkdir(filePath).catch(logError);
    resolve();
  });
}

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

function getCrosswords(type) {

  const root = path.join(__dirname);

  return new Promise(async (resolve) => {

    // First add a folder to root
    await addFolder(root, type).catch(logError);

    // Iterate over the crossword URIs (2 at a time)
    // request them from the ES, parse the XML to JSON
    // restructure the JSON into something more managable,
    // then save it to disc.
    uris[type].forEach((link, i) => throttle(async () => {

      const filePath = path.join(__dirname, `data/${type}`);
      const filename = link.split('/').pop().replace('xml', 'json');
      const uri = `${filePath}/${filename}`;

      try {

        const res = await request(link);
        const data = await promisifiedParseString(res);
        const xwordObj = restructureData(data);

        // Remove stringify indentation once work has been done
        const json = JSON.stringify(xwordObj);

        await promisifiedWriteFile(uri, json);
        log(`Saved ${i}/${uris[type].length} ${uri}`);

      } catch (err) {
        console.log(`${uri} - bad or missing data`);
      }

    }));

    resolve();

  });

}

(async () => {
  await getCrosswords('easy');
  await getCrosswords('quick');
})();
