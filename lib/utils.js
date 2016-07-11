'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('base-pkg', 'pkg');
require('base-project', 'project');
require('base-questions', 'questions');
require('camel-case', 'camelcase');
require('common-config', 'common');
require('define-property', 'define');
require('extend-shallow', 'extend');
require('is-valid-app', 'isValid');
require('omit-empty');
require('set-getter', 'set');
require = fn;

utils.getProjectName = function(app) {
  return app.get('cache.data.name') || app.pkg.get('name') || app.project;
};

utils.getProjectAlias = function(app, name) {
  name = name || utils.getProjectName(app);
  if (typeof name === 'undefined') return;
  if (typeof app.toAlias === 'function') {
    return app.toAlias.call(app, name);
  }
  if (typeof app.options.toAlias === 'function') {
    return app.options.toAlias.call(app, name);
  }
  if (app.aliasRegex instanceof RegExp) {
    return utils.camelcase(name.replace(app.aliasRegex, ''));
  }
  return utils.camelcase(name);
};

utils.getProjectOwner = function(app) {
  var owner = app.get('cache.data.owner');
  if (typeof owner === 'string') {
    return owner;
  }

  var name = utils.getProjectName(app);
  if (typeof name === 'undefined') {
    return app.pkg.get('author.username');
  }

  if (/^base-/.test(name)) {
    return 'node-base';
  }
  if (/^assemble-/.test(name)) {
    return 'assemble';
  }
  if (/^generate-/.test(name)) {
    return 'generate';
  }
  if (/^(helper|handlebars-helper)-/.test(name)) {
    return 'helpers';
  }
  if (/^updater-/.test(name)) {
    return 'update';
  }
  if (/^verb-/.test(name)) {
    return 'verbose';
  }

  owner = app.get('cache.data.owner');
  if (owner) {
    return owner;
  }

  var repo = app.get('cache.data.repository') || app.pkg.get('repository');
  if (typeof repo === 'string' && !/:/.test(repo)) {
    var segs = repo.split('/');
    if (segs.length === 2) {
      return segs.shift();
    }
  }
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
