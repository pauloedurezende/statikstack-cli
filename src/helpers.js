const fetch = require('node-fetch');
const inquirer = require('inquirer');
const _ = require('lodash');
const { type } = require('os');
const { exec } = require('child_process');

const { kitQuestion } = require('./questions');

function downloadKitList(url, callback) {
  fetch(url)
    .then((kitList) => kitList.json())
    .then((kitList) => callback(null, {}, kitList))
    .catch(() =>
      callback(
        'Oops! Unable to purchase list of kits, please, try again later!'
      )
    );
}

function showConsoleMessage(message, answers = {}, kitList = [], callback) {
  console.log(`\n${message}`);

  callback(null, answers, kitList);
}

function showGenericQuestion(question, answers = {}, kitList = [], callback) {
  inquirer
    .prompt(question)
    .then((answer) => callback(null, { ...answers, ...answer }, kitList));
}

function unionQuestion(kitType, answers = {}, kitList = [], callback) {
  const choices = _.union([], kitList.map((item) => item[kitType]));

  callback(null, answers, kitList, choices);
}

function showKitQuestion(
  kitType,
  answers = {},
  kitList = [],
  choices = [],
  callback
) {
  inquirer
    .prompt(kitQuestion(kitType, choices))
    .then((answer) =>
      callback(
        null,
        { ...answers, kit: { ...answers.kit, ...answer } },
        kitList
      )
    );
}

function filterKitList(kitType, answers = {}, kitList = [], callback) {
  let filter;

  switch (kitType) {
    case 'markup':
      filter = { markup: answers.kit.markup };
      break;
    case 'style':
      filter = { markup: answers.kit.markup, style: answers.kit.style };
      break;
    case 'script':
      filter = {
        markup: answers.kit.markup,
        style: answers.kit.style,
        script: answers.kit.script
      };
      break;
    case 'bundler':
      filter = {
        markup: answers.kit.markup,
        style: answers.kit.style,
        script: answers.kit.script,
        bundler: answers.kit.bundler
      };
      break;
    default:
      break;
  }

  const filteredKitList = _.filter(kitList, filter);

  callback(null, answers, filteredKitList);
}

function downloadStarterKit(answers = {}, kitList = [], callback) {
  const { markup, style, script, bundler } = answers.kit;
  const { folder } = answers;

  exec(
    `git clone https://github.com/statikstack/${markup}-${style}-${script}-${bundler} ${folder}`,
    (err) => {
      if (err) {
        return callback(err);
      }

      callback(null, answers, kitList);
      return true;
    }
  );
}

function removeDir(folder) {
  if (type() === 'Linux' || type() === 'Darwin') {
    return `rm -rf ${folder}`;
  }
  return `rmdir /s /q ${folder}`;
}

function downloadDependencies(answers = {}, kitList = [], callback) {
  const { folder } = answers;

  exec(`cd ${folder} && ${removeDir('.git')} && npm install`, (err) => {
    if (err) {
      return callback(err);
    }

    callback(null, answers, kitList);
    return true;
  });
}

module.exports = {
  downloadKitList,
  showConsoleMessage,
  showGenericQuestion,
  unionQuestion,
  showKitQuestion,
  filterKitList,
  downloadStarterKit,
  downloadDependencies
};
