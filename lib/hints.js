'use strict';

var utils = require('./utils');
var hints;

module.exports = function(app, options) {
  if (!utils.isValid(app, 'common-questions-hints')) {
    return hints;
  }

  hints = {project: {}, author: {}};
  if (disableHints(app, options)) {
    return hints;
  }

  if (typeof app.data === 'function') {
    app.data(app.base.cache.data);
  }

  hints.license = 'MIT';
  utils.set(hints, 'name', function() {
    return utils.getProjectName(app);
  });

  utils.set(hints, 'alias', function() {
    return utils.getProjectAlias(app, hints.name);
  });

  utils.set(hints, 'owner', function() {
    return utils.getProjectOwner(app);
  });

  utils.set(hints, 'description', function() {
    return app.pkg.get('description');
  });

  utils.set(hints, 'version', function() {
    return app.pkg.get('version') || '0.1.0';
  });

  utils.set(hints, 'author.username', function() {
    return get(app, 'author.username', false);
  });

  utils.set(hints, 'author.twitter', function() {
    return get(app, 'author.twitter', false);
  });

  utils.set(hints, 'author.email', function() {
    return get(app, 'author.email');
  });

  utils.set(hints, 'author.name', function() {
    return get(app, 'author.name');
  });

  utils.set(hints, 'author.url', function() {
    return get(app, 'author.url');
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
      app.data.del(key);
      app.pkg.del(key);
      delete question.default;
    }
    return true;
  }
}

module.exports.disabled = disableHints;
