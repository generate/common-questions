/*!
 * common-questions <https://github.com/jonschlinkert/common-questions>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

module.exports = function(config) {
  var merge = require('mixin-deep');

  return function(app, base) {
    if (!app.isApp || app.isRegistered('common-questions')) return;

    if (typeof app.questions === 'undefined') {
      throw new Error('expected the base-questions plugin to be registered');
    }
    if (typeof app.pkg === 'undefined') {
      app.use(require('base-pkg')());
    }

    var opts = merge({}, config, this.options);
    app.cache.data = app.cache.data || {};

    function store(prop) {
      if (app.globals && app.globals.get) {
        return app.globals.get(prop);
      }
      return app.pkg.get(prop);
    }

    /**
     * Author questions
     */

    app.questions.disable('save')
      .set('author.name', 'Author\'s name?', {
        default: store('author.name')
      })
      .set('author.username', 'Author\'s GitHub username?', {
        default: store('author.username')
      })
      .set('author.twitter', 'Author\'s twitter username?', {
        default: store('author.twitter')
      })
      .set('author.email', 'Author\'s email address?', {
        default: store('author.email')
      })
      .set('author.url', 'Author\'s URL?', {
        default: store('author.url')
      });

    /**
     * Project questions
     */

    app.questions.disable('save')
      .set('name', 'Project name?', {
        default: projectName(app)
      })
      .set('alias', 'Project alias?', {
        default: projectAlias(app)
      })
      .set('description', 'Project description?', {
        default: app.pkg.get('description')
      })
      .set('version', 'Project version?', {
        default: app.pkg.get('version') || '0.1.0'
      })
      .set('owner', 'Project owner?', {
        default: projectOwner(app)
      })
  };
};

function projectName(app) {
  return app.cache.data.name || app.pkg.get('name') || app.project;
}

function projectAlias(app) {
  if (typeof app.aliasFn === 'function') {
    return app.aliasFn.call(app, projectName(app));
  }
  if (typeof app.options.aliasFn === 'function') {
    return app.options.aliasFn.call(app, projectName(app));
  }
  var name = projectName(app);
  if (typeof name === 'string') {
    return name.slice(name.lastIndexOf('-') + 1);
  }
}

function projectOwner(app) {
  if (!userIsOwner(app)) {
    return app.cache.data.owner;
  }
  var name = app.cache.data.name;
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
  if (/^updater?-/.test(name)) {
    return 'update';
  }
  if (/^verb-/.test(name)) {
    return 'verbose';
  }
  return app.cache.data.owner;
}

function userIsOwner(app) {
  var author = app.cache.data.author;
  if (typeof author === 'undefined') {
    return true;
  }
  if (author && typeof author === 'object') {
    author = author.url || author.username;
  }
  var git = require('parse-git-config');
  var config = git.sync({cwd: app.cwd});
  if (!config || !config.user) {
    config = git.sync('global');
  }
  if (!config || !config.user || typeof config.user.name !== 'string') {
    return;
  }
  var re = new RegExp(config.user.name, 'i');
  return re.test(author);
}
