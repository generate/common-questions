'use strict';

require('mocha');
var assert = require('assert');
var Base = require('base');
var ask = require('base-questions');
var pkg = require('base-pkg');
var questions = require('./');
var base;

describe('common-questions', function() {
  beforeEach(function() {
    base = new Base();
    base.isApp = true;
    base.use(ask());
    base.use(pkg());
  });

  it('should export a function', function() {
    assert.equal(typeof questions, 'function');
  });

  it('should work as a plugin', function() {
    base.use(questions());
    assert(base.questions.cache.hasOwnProperty('project.name'));
    assert(base.questions.cache.hasOwnProperty('project.alias'));
    assert(base.questions.cache.hasOwnProperty('project.owner'));
    assert(base.questions.cache.hasOwnProperty('project.description'));
    assert(base.questions.cache.hasOwnProperty('author.name'));
    assert(base.questions.cache.hasOwnProperty('author.url'));
  });
});
