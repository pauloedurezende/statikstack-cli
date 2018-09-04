#! /usr/bin/env node

const { resolve } = require('path');
const inquirer = require('inquirer');
const simpleGit = require('simple-git');

const repositories = require('./repositories');

const question = {
  name: 'project-choice',
  type: 'list',
  message: 'Which project would you like to generate?',
  choices: repositories.map((repo) => repo)
};

inquirer.prompt(question).then((answers) => {
  simpleGit()
    .exec(() => console.log('Starting the download...'))
    .clone(
      `https://github.com/statikstack/${answers['project-choice']}`,
      resolve(answers['project-choice'])
    )
    .exec(() => console.log('Download successful!'));
});
