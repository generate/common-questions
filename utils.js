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
require('isobject', 'isObject');
require('is-valid-app', 'isValid');
require('mixin-deep', 'merge');
require('parse-git-config', 'parse');
require = fn;

/**
 * Expose `utils` modules
 */

module.exports = utils;
