#! /usr/bin/env node

const { resolve } = require('path');
const inquirer = require('inquirer');
const simpleGit = require('simple-git');
const childProcess = require('child_process');

const questions = require('./questions');

inquirer.prompt(questions).then(({ selectedRepo, folderName }) => {
  simpleGit()
    .exec(() => console.log('Starting the project download...'))
    .clone(
      `https://github.com/statikstack/${selectedRepo}`,
      resolve(folderName)
    )
    .exec(() => console.log('The Project have been downloaded!'))
    .exec(() => console.log('Downloading the project dependencies...'))
    .exec(() =>
      childProcess.exec(`cd ${folderName} && rm -rf .git && npm install`, () =>
        console.log('The dependencies have been downloaded!')
      )
    );
});
