const fs = require('fs');
const { promisify } = require('util');

const mkdirP = promisify(fs.mkdir);
const statP = promisify(fs.stat);
const writeFileP = promisify(fs.writeFile);

function logError(err) {
  console.error(err.statusCode);
}

function addFolder(filePath) {
  return new Promise(async (resolve) => {
    try {
      await mkdirP(filePath);
      console.log(`Added folder: ${filePath}`);
      resolve();
    } catch (err) {
      console.error(err.message);
    }
  });
}

function writeFile(filePath, json) {
  return new Promise(async (resolve) => {
    try {
      await writeFileP(filePath, json);
      resolve();
    } catch (err) {
      console.error(err.message);
    }
  });
}

function pathExists(path) {
  return new Promise(async (resolve) => {
    try {
      await statP(path);
      resolve(true);
    } catch (err) {
      resolve(false);
    }
  });
}

module.exports = {
  addFolder,
  logError,
  pathExists,
  writeFile
};
