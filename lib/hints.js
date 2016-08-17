'use strict';

var utils = require('./utils');
var hints = {};

module.exports = function(app, options) {
  if (!utils.isValid(app, 'common-questions-hints')) {
    return hints;
  }

  if (disableHints(app, options)) {
    return hints;
  }

  if (typeof app.data === 'function') {
    app.data(app.base.cache.data);
  }

  hints.license = 'MIT';
  var answers = {};

  utils.set(hints, 'name', function() {
    return (answers.name = utils.getProjectName(app));
  });

  utils.set(hints, 'alias', function() {
    return (answers.alias = utils.getProjectAlias(app, hints.name));
  });

  utils.set(hints, 'owner', function() {
    return (answers.owner = utils.getProjectOwner(app));
  });

  utils.set(hints, 'description', function() {
    return (answers.description = app.pkg.get('description'));
  });

  utils.set(hints, 'homepage', function() {
    var owner = answers.owner || answers['author.username'];
    var name = answers.name;
    if (owner && name) {
      return (answers.homepage = `https://github.com/${owner}/${name}`);
    }
  });

  utils.set(hints, 'version', function() {
    return (answers.version = (app.pkg.get('version') || '0.1.0'));
  });

  utils.set(hints, 'author.username', function() {
    return (answers['author.username'] = (get(app, 'author.username') || answers.owner));
  });

  utils.set(hints, 'author.twitter', function() {
    return (answers['author.twitter'] = (get(app, 'author.twitter') || answers.username));
  });

  utils.set(hints, 'author.email', function() {
    return (answers['author.email'] = get(app, 'author.email'));
  });

  utils.set(hints, 'author.name', function() {
    return (answers['author.name'] = get(app, 'author.name'));
  });

  utils.set(hints, 'author.url', function() {
    return (answers['author.url'] = get(app, 'author.url'));
  });
  return hints;
};

function get(app, key, common) {
  var val = app.get(`cache.data.${key}`) || app.get(`cache.data.project.${key}`) || app.pkg.get(key);
  if (typeof val !== 'undefined') {
    return val;
  }
  if (common !== false) {
    return utils.common.get(key);
  }
}

function disableHints(app, options, val, key, question) {
  if (options.del === 'hints') {
    options.hints = false;
  }

  if (options.hints === false) {
    if (typeof key !== 'undefined') {
      app.questions.hints.data = {};
      delete question.default;
    }
    return true;
  }
}

module.exports.disabled = disableHints;
