const { type } = require('os');
const { cwd } = require('process');
const { readdirSync } = require('fs');
const { exec } = require('child_process');
const { log } = require('console');

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
    if (folder === folderName.toLowerCase()) {
      folderExist = true;
      return;
    }
    folderExist = false;
  });

  return folderExist;
}

function downloadRepo(repositorie, folder) {
  log('Starting the project download...');

  return new Promise((resolve, reject) => {
    exec(
      `git clone https://github.com/statikstack/${repositorie} ${folder}`,
      (err) => {
        if (err) reject(err);

        resolve('The Project have been downloaded!');
      }
    );
  });
}

module.exports = { removeDir, validateFolder, downloadRepo };
