const { existsSync } = require('fs');

const folderName = {
  name: 'folder',
  type: 'input',
  message: 'Enter the name of your project',
  validate(name) {
    const folderExist = existsSync(name);

    if (folderExist) {
      return 'There is already a project with this name';
    }

    if (name === '') {
      return 'Please enter a name for your project';
    }
    return true;
  }
};

function kitQuestion(type, choices) {
  return {
    name: `${type}`,
    type: 'list',
    message: `Choose a ${type} language`,
    choices
  };
}

module.exports = { folderName, kitQuestion };
