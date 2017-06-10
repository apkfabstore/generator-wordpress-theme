'use strict';

let _ = require('lodash');

module.exports = function (base) {
  var validateRequired = function (value) {
    if (value === '') {
      return 'This field is required, please enter a valid value.';
    }
    return true;
  };

  return [
    {
      type: 'text',
      name: 'projectName',
      message: 'What slug do you want to use for this project?',
      default: _.kebabCase(base.appname),
      validate: function (input) {
        if (!/^(?:[a-z0-9]+-?[a-z0-9]+)+$/g.test(input)) {
          return 'You should follow the WordPress plugin name standard.';
        }
        return true;
      }
    },
    {
      name: 'projectTitle',
      message: 'What is the full name for this project?',
      default: function (answers) {
        return _.startCase(_.toLower(answers.projectName));
      },
      validate: validateRequired
    },
    {
      type: 'text',
      name: 'projectDescription',
      message: 'What is the project description?',
      default: function (answers) {
        return 'This is the ' + answers.projectTitle + ' description.';
      }
    },
    {
      type: 'text',
      name: 'projectManager',
      message: 'Do you want to use grunt or gulp as your build system? (Leave blank if you dont want to use anything)',
      default: function () {
        return base.options.template ? '' : 'grunt';
      },
      validate: function (input) {
        if (['', 'grunt', 'gulp'].indexOf(input) === -1) {
          return 'You must use grunt, gulp or leave it blank.';
        }
        return true;
      }
    },
    {
      type: 'text',
      name: 'projectVersion',
      message: 'The version to initialize this project.',
      default: '0.0.1',
      validate: function (input) {
        if (!/^\bv?(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/.test(input)) {
          return 'You should enter a valid version.';
        }
        return true;
      }
    },
    {
      type: 'text',
      name: 'projectAuthor',
      message: 'The name of the author for this project?',
      default: base.user.git.name() || ''
    },
    {
      type: 'text',
      name: 'projectLicense',
      message: 'What license do you want to use?',
      default: 'ISC',
      validate: validateRequired
    }
  ];
};
