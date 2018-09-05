#! /usr/bin/env node

const { resolve } = require('path');
const inquirer = require('inquirer');
const simpleGit = require('simple-git');

const questions = require('./questions');

inquirer.prompt(questions).then(({ selectedRepo, folderName }) => {
  simpleGit()
    .exec(() => console.log('Starting the download...'))
    .clone(
      `https://github.com/statikstack/${selectedRepo}`,
      resolve(folderName)
    )
    .exec(() => console.log('Download successful!'));
});
