/*!
 * common-questions <https://github.com/jonschlinkert/common-questions>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var utils = require('./utils');

module.exports = function(config) {
  config = config || {};

  return function(app, base) {
    if (!utils.isValid(app, 'common-questions')) return;

    /**
     * Plugins
     */

    app.use(utils.project());
    app.use(utils.questions());
    app.use(utils.pkg());

    this.cache.data = this.cache.data || {};
    if (typeof app.option === 'function') {
      app.option(config);
    } else {
      utils.merge(this.options, config);
    }

    /**
     * Author questions
     */

    app.questions.disable('save')
      .set('author.name', 'Author\'s name?', {
        default: store(app, 'author.name')
      })
      .set('author.username', 'Author\'s GitHub username?', {
        default: store(app, 'author.username')
      })
      .set('author.twitter', 'Author\'s twitter username?', {
        default: store(app, 'author.twitter')
      })
      .set('author.email', 'Author\'s email address?', {
        default: store(app, 'author.email')
      })
      .set('author.url', 'Author\'s URL?', {
        default: store(app, 'author.url')
      });

    /**
     * Project questions
     */

    app.questions.disable('save')
      .set('project.name', 'Project name?', {
        default: projectName(app)
      })
      .set('project.alias', 'Project alias?', {
        default: projectAlias(app)
      })
      .set('project.description', 'Project description?', {
        default: app.pkg.get('description')
      })
      .set('project.version', 'Project version?', {
        default: app.pkg.get('version') || '0.1.0'
      })
      .set('project.owner', 'Project owner?', {
        default: projectOwner(app)
      });

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
      });
  };
};

function store(app, prop) {
  var expanded = app.pkg.expand();
  utils.merge(app.cache.data, expanded);
  var val = app.get(['cache.data', prop]);
  if (typeof val !== 'undefined') {
    return val;
  }
  if (app.store && typeof app.store.has === 'function' && app.store.has(prop)) {
    return app.store.get(prop);
  }
  if (app.globals && typeof app.globals.has === 'function' && app.globals.has(prop)) {
    return app.globals.get(prop);
  }
}

function getAuthor(app) {
  var author = app.cache.data.author;
  if (!utils.isObject(author)) {
    var expanded = app.pkg.expand();
    var val = expanded.get('author');
    if (utils.isObject(val)) {
      author = val;
    }
  }
  return author;
}

function projectName(app) {
  return app.get('cache.data.name')
    || app.get('cache.data.project.name')
    || app.pkg.get('name')
    || app.project;
}

function projectAlias(app) {
  if (typeof app.toAlias === 'function') {
    return app.toAlias.call(app, projectName(app));
  }
  if (typeof app.options.toAlias === 'function') {
    return app.options.toAlias.call(app, projectName(app));
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
  return app.get('cache.data.owner') || app.get('cache.data.author.username');
}

function userIsOwner(app) {
  var username = app.get('cache.data.author.username');
  if (typeof username === 'undefined') {
    return true;
  }
  var config = utils.parse.sync({cwd: app.cwd});
  if (!config || !config.user) {
    config = utils.parse.sync('global');
  }
  if (!config || !config.user || typeof config.user.name !== 'string') {
    return;
  }
  return username.indexOf(config.user.name) !== -1;
}
