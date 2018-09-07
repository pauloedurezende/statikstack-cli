#! /usr/bin/env node

const inquirer = require('inquirer');
const { exec } = require('child_process');
const { log } = require('console');

const questions = require('./questions');
const { removeDir, downloadRepo } = require('./helpers');

inquirer.prompt(questions).then(({ selectedRepo, folderName }) => {
  downloadRepo(selectedRepo, folderName)
    .then((message) => log(message))
    .then(() => log('Downloading the project dependencies...'))
    .then(() =>
      exec(`cd ${folderName} && ${removeDir('.git')} && npm install`, () =>
        log('The dependencies have been downloaded!')
      )
    )
    .catch((err) => log(err));
});
