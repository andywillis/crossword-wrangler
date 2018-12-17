const request = require('request');
const fs = require('fs');
const path = require('path');
const createThrottle = require('async-throttle');
const { parseString } = require('xml2js');

const throttle = createThrottle(2);

const uris = { easy: [], quick: [] };
const uri = 'https://ams.cdn.arkadiumhosted.com/assets/gamesfeed/evening-standard/daily-crossword/';

function padNumber(n) {
  const s = n.toString();
  return s.length === 1 ? `0${s}` : s;
}

function getWeekDayCalendar(year) {
  const arr = [];
  for (let m = 1; m <= 12; m++) {

    // JS is messy to get the number of days in a month
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

console.log(JSON.stringify(uris));

function verifyFolderExists(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err) => {
      if (err) {
        fs.mkdir(path, (err) => {
          if (err) reject(err);
          resolve();
        });
      }
      resolve();
    });
  });
}

const root = path.join(__dirname);

function setupFolders() {
  return new Promise(async (resolve) => {
    await verifyFolderExists(`${root}/data/easy`);
    await verifyFolderExists(`${root}/data/quick`);  
    resolve();
  });
}

setupFolders().then(() => {
  uris.easy.forEach(link => throttle(async () => {
    const filePath = path.join(__dirname, 'data/easy');
    const filename = link.split('/').pop();
    request(link).pipe(fs.createWriteStream(`${filePath}/${filename}`));
  }));
  uris.quick.forEach(link => throttle(async () => {
    const filePath = path.join(__dirname, 'data/quick');
    const filename = link.split('/').pop();
    request(link).pipe(fs.createWriteStream(`${filePath}/${filename}`));
  }));
});
