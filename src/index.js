#! /usr/bin/env node

const inquirer = require('inquirer');
const { exec } = require('child_process');
const _ = require('lodash');

const populateQuestions = require('./questions');
const { downloadKitList, downloadKit, removeDir } = require('./helpers');

let kits;
let answers;

downloadKitList('https://statik.now.sh/assets/repositories.json')
  .then((data) => {
    kits = data;
  })
  .then(() => console.log('\n🔥  Welcome to Statik!\n'))
  .then(() => populateQuestions(kits))
  .then((questions) =>
    inquirer.prompt(questions).then((answersList) => {
      answers = answersList;
    })
  )
  .then(() => {
    const { markup, style, script, bundler, folder } = answers;

    answers = {
      kit: _.join([markup, style, script, bundler], '-'),
      folder
    };
  })
  .then(() => console.log('\n🚀  Downloading starter-kit...\n'))
  .then(() => {
    const { kit, folder } = answers;

    downloadKit(kit, folder)
      .then(() => {
        console.log('📦  Downloading dependencies...\n');
      })
      .then(() => {
        exec(`cd ${folder} && ${removeDir('.git')} && npm install`, () =>
          console.log('🎉  Sucessfully created!\n')
        );
      })
      .catch((err) => console.log(err));
  })
  .catch(() =>
    console.log(
      'Oops! Unable to purchase list of kits, please, try again later!'
    )
  );
