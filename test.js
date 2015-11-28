'use strict';

require('mocha');
var assert = require('assert');
var commonQuestions = require('./');

describe('common-questions', function() {
  it('should export a function', function() {
    assert.equal(typeof commonQuestions, 'function');
  });

  it('should return an object of questions', function() {
    assert.equal(typeof commonQuestions(), 'object');
  });
});
