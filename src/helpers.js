const { type } = require('os');
const { cwd } = require('process');
const { readdirSync } = require('fs');

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

module.exports = { removeDir, validateFolder };
