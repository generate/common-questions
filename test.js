'use strict';

require('mocha');
var assert = require('assert');
var Base = require('base');
var extend = require('extend-shallow');
var askWhen = require('ask-when');
var hints = require('./lib/hints');
var questions = require('./');
var pkg = require('./package');
var app;

describe('common-questions', function() {
  beforeEach(function() {
    app = new Base({isApp: true});
    app.use(questions());
    app.use(askWhen());
  });

  describe('plugin', function() {
    it('should export a function', function() {
      assert.equal(typeof questions, 'function');
    });

    it('should work as a plugin', function(cb) {
      var opts = {name: 'foo', askWhen: 'not-answered'};
      app.askWhen('name', opts, function(err, answers) {
        if (err) return cb(err);

        assert.equal(answers.name, 'foo');
        assert(app.questions.cache.hasOwnProperty('project.name'));
        assert(app.questions.cache.hasOwnProperty('project.alias'));
        assert(app.questions.cache.hasOwnProperty('project.owner'));
        assert(app.questions.cache.hasOwnProperty('project.description'));
        assert(app.questions.cache.hasOwnProperty('author.name'));
        assert(app.questions.cache.hasOwnProperty('author.url'));
        cb();
      });
    });
  });

  describe('hints', function() {
    it('should add a hint to the `name` question', function() {
      var question = app.questions.get('name');
      assert.equal(question.default, pkg.name);
    });

    it('should add a hint to the `alias` question', function() {
      var question = app.questions.get('alias');
      assert.equal(question.default, 'commonQuestions');
    });

    it('should add a hint to the `owner` question', function() {
      var question = app.questions.get('owner');
      assert.equal(question.default, 'generate');
    });

    it('should add a hint to the `owner` question, using app.cache.data', function() {
      app.registered = {};
      app.set('cache.data.owner', 'foo');
      app.use(questions());

      var question = app.questions.get('owner');
      assert.equal(question.default, 'foo');
    });

    it('should add a hint to the `description` question', function() {
      var question = app.questions.get('description');
      assert.equal(question.default, pkg.description);
    });

    it('should add a hint to the `version` question', function() {
      var question = app.questions.get('version');
      assert.equal(question.default, pkg.version);
    });

    it('should add a hint to the `license` question', function() {
      var question = app.questions.get('license');
      assert.equal(question.default, 'MIT');
    });

    if (!process.env.CI) {
      it('should add a hint for author.name', function() {
        var question = app.questions.get('author.name');
        assert.equal(question.default, 'Jon Schlinkert');
      });
    }

    it('should get author.name from app.cache.data', function() {
      app.registered = {};
      app.set('cache.data.author.name', 'Brian Woodward');
      app.use(questions());

      var question = app.questions.get('author.name');
      assert.equal(question.default, 'Brian Woodward');
    });
  });
});
