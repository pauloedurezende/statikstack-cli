const repositories = require('./repositories');

module.exports = [
  {
    name: 'selectedRepo',
    type: 'list',
    message: 'Which project would you like to generate?',
    choices: repositories.map((repo) => repo)
  }
];
