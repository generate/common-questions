'use strict';

var hints = require('./hints');
var utils = require('./utils');

exports.all = function(app, options) {
  if (!utils.isValid(app, 'common-questions-messages')) return;
  var data = hints(app, options);

  exports.author(app, data);
  exports.project(app, data);
};

/**
 * Author questions
 */

exports.author = function(app, data) {
  app.questions.disable('save')
    .set('author.name', 'Author\'s name?', {
      default: data.author.name
    })
    .set('author.username', 'Author\'s username?', {
      default: data.author.username
    })
    .set('author.twitter', 'Author\'s twitter username?', {
      default: data.author.twitter
    })
    .set('author.email', 'Author\'s email address?', {
      default: data.author.email
    })
    .set('author.url', 'Author\'s URL?', {
      default: data.author.url
    });
};

/**
 * Project questions
 */

exports.project = function(app, data) {
  app.questions.disable('save')
    .set('name', 'Project name?', {
      default: data.name
    })
    .set('description', 'Project description?', {
      default: data.description
    })
    .set('version', 'Project version?', {
      default: data.version
    })
    .set('license', 'Project license?', {
      default: data.license
    })
    .set('alias', 'Project alias (for variables)?', {
      default: data.alias
    })
    .set('owner', 'Project owner (GitHub username)?', {
      default: data.owner
    });

  app.questions.disable('save')
    .set('project.name', 'Project name?', {
      default: data.name
    })
    .set('project.description', 'Project description?', {
      default: data.description
    })
    .set('project.version', 'Project version?', {
      default: data.version
    })
    .set('project.license', 'Project license?', {
      default: data.license
    })
    .set('project.alias', 'Project alias (for variables)?', {
      default: data.alias
    })
    .set('project.owner', 'Project owner (GitHub username)?', {
      default: data.owner
    });
};
