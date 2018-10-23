#! /usr/bin/env node
const { waterfall, apply } = require('async');

const {
  downloadKitList,
  showConsoleMessage,
  showGenericQuestion,
  unionQuestion,
  showKitQuestion,
  filterKitList,
  downloadStarterKit,
  downloadDependencies
} = require('./helpers');
const { folderName } = require('./questions');

waterfall(
  [
    // Download the list of repositories
    apply(downloadKitList, 'https://statik.now.sh/assets/repositories.json'),
    apply(showConsoleMessage, '🔥  Welcome to Statik!\n'),
    apply(showGenericQuestion, folderName),
    // Markup
    apply(unionQuestion, 'markup'),
    apply(showKitQuestion, 'markup'),
    // Style
    apply(filterKitList, 'markup'),
    apply(unionQuestion, 'style'),
    apply(showKitQuestion, 'style'),
    // Script
    apply(filterKitList, 'style'),
    apply(unionQuestion, 'script'),
    apply(showKitQuestion, 'script'),
    // Bundler
    apply(filterKitList, 'script'),
    apply(unionQuestion, 'bundler'),
    apply(showKitQuestion, 'bundler'),
    // Download the selected starter kit
    apply(showConsoleMessage, '🚀  Downloading starter-kit...'),
    downloadStarterKit,
    // Enter inside the selected folder, remove the .git folder and install dependencies
    apply(showConsoleMessage, '📦  Downloading dependencies...'),
    downloadDependencies
  ],
  (err) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log('\n🎉  Sucessfully created!');
  }
);
