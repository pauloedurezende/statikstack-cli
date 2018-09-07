const repositories = require('./repositories');
const { validateFolder } = require('./helpers');

module.exports = [
  {
    name: 'selectedRepo',
    type: 'list',
    message: 'Which project would you like to generate?',
    choices: repositories.map((repo) => repo)
  },
  {
    name: 'folderName',
    type: 'input',
    message: 'Enter the name of your project',
    validate(name) {
      const folderExist = validateFolder(name);

      if (folderExist) {
        return 'There is already a project with this name!';
      }

      if (name === '') {
        return 'Please enter a name for the folder';
      }
      return true;
    }
  }
];
