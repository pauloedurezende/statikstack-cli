#! /usr/bin/env node

const { resolve } = require('path');
const inquirer = require('inquirer');
const simpleGit = require('simple-git');

const questions = require('./questions');

inquirer.prompt(questions).then(({ selectedRepo }) => {
  simpleGit()
    .exec(() => console.log('Starting the download...'))
    .clone(
      `https://github.com/statikstack/${selectedRepo}`,
      resolve(selectedRepo)
    )
    .exec(() => console.log('Download successful!'));
});
