const { validateFolder, createChoiceList } = require('./helpers');

function populateQuestions(repositories) {
  return [
    {
      name: 'folder',
      type: 'input',
      message: 'Enter the name of your project',
      validate(name) {
        const folderExist = validateFolder(name);

        if (folderExist) {
          return 'There is already a project with this name';
        }

        if (name === '') {
          return 'Please enter a name for your project';
        }
        return true;
      }
    },
    {
      name: 'markup',
      type: 'list',
      message: 'Choose a markup language',
      choices: createChoiceList(repositories, 'markup')
    },
    {
      name: 'style',
      type: 'list',
      message: 'Choose a style language',
      choices: createChoiceList(repositories, 'style')
    },
    {
      name: 'script',
      type: 'list',
      message: 'Choose a script language',
      choices: createChoiceList(repositories, 'script')
    },
    {
      name: 'bundler',
      type: 'list',
      message: 'Choose a bundler',
      choices: createChoiceList(repositories, 'bundler')
    }
  ];
}

module.exports = populateQuestions;
