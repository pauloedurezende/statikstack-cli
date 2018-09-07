#! /usr/bin/env node

const { resolve } = require('path');
const inquirer = require('inquirer');
const simpleGit = require('simple-git');
const { exec } = require('child_process');

const questions = require('./questions');
const { removeDir } = require('./helpers');

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
      exec(`cd ${folderName} && ${removeDir('.git')} && npm install`, () =>
        console.log('The dependencies have been downloaded!')
      )
    );
});
