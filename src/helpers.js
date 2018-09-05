const { type } = require('os');

function removeDir(folder) {
  if (type() === 'Linux' || type() === 'Darwin') {
    return `rm -rf ${folder}`;
  }
  return `rmdir /s /q ${folder}`;
}

module.exports = { removeDir };
