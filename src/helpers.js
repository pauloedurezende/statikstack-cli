const { type } = require('os');
const { cwd } = require('process');
const { readdirSync } = require('fs');
const { exec } = require('child_process');
const { log } = require('console');
const fetch = require('node-fetch');
const _ = require('lodash');

function removeDir(folder) {
  if (type() === 'Linux' || type() === 'Darwin') {
    return `rm -rf ${folder}`;
  }
  return `rmdir /s /q ${folder}`;
}

function validateFolder(folderName) {
  let folderExist;
  const folders = readdirSync(cwd());

  folders.forEach((folder) => {
    if (folder.toLowerCase() === folderName.toLowerCase()) {
      folderExist = true;
      return;
    }
    folderExist = false;
  });

  return folderExist;
}

function downloadKit(repositorie, folder) {
  return new Promise((resolve, reject) => {
    exec(
      `git clone https://github.com/statikstack/${repositorie} ${folder}`,
      (err) => {
        if (err) reject(err);

        resolve();
      }
    );
  });
}

function downloadKitList(url) {
  return fetch(url).then((res) => res.json());
}

function createChoiceList(originalList, listType) {
  return _.union([], originalList.map((item) => item[listType]));
}

module.exports = {
  removeDir,
  validateFolder,
  downloadKit,
  downloadKitList,
  createChoiceList
};
