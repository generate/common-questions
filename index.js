/*!
 * common-questions <https://github.com/jonschlinkert/common-questions>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var project = require('project-name');

module.exports = function(options) {
  options = options || {};
  return {
    setDefault: {
      'author.name': 'Author\'s name?',
      'author.url': 'Author\'s URL?',
      'author.username': 'Author\'s GitHub username?'
    },
    set: {
      name: {
        message: 'Project name?',
        default: project(process.cwd()),
        force: !!options.init
      },
      description: {
        message: 'Project description?',
        force: !!options.init
      }
    }
  };
};
