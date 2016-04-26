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
    assert(base.questions.cache.hasOwnProperty('name'));
    assert(base.questions.cache.hasOwnProperty('alias'));
    assert(base.questions.cache.hasOwnProperty('owner'));
    assert(base.questions.cache.hasOwnProperty('description'));
    assert(base.questions.cache.hasOwnProperty('author.name'));
    assert(base.questions.cache.hasOwnProperty('author.url'));
  });
});
