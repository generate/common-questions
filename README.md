# common-questions [![NPM version](https://img.shields.io/npm/v/common-questions.svg?style=flat)](https://www.npmjs.com/package/common-questions) [![NPM downloads](https://img.shields.io/npm/dm/common-questions.svg?style=flat)](https://npmjs.org/package/common-questions) [![Build Status](https://img.shields.io/travis/generate/common-questions.svg?style=flat)](https://travis-ci.org/generate/common-questions)

An object of questions commonly used by project generators or when initializing projects. Questions can be overridden, updated or extended.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save common-questions
```

**HEADS UP!** as of v0.2.0 this has been refactored to work as a [base](https://github.com/node-base/base) plugin.

## Usage

```js
var questions = require('common-questions');
```

## Questions

Adds the following [questions](https://github.com/node-base/base-questions) and message text:

**Author questions**

* `author.name`: `Author's name?`
* `author.username`: `Author's GitHub username?`
* `author.twitter`: `Author's twitter username?`
* `author.email`: `Author's email address?`
* `author.url`: `Author's URL?`

**Project questions**

* `project.name`: `Project name?`
* `project.alias`: `Project alias?`
* `project.description`: `Project description?`
* `project.version`: `Project version?`
* `project.license`: `Project license?`
* `project.owner`: `Project owner?`

and...

* `name`: `Project name?`
* `alias`: `Project alias?`
* `description`: `Project description?`
* `version`: `Project version?`
* `license`: `Project license?`
* `owner`: `Project owner?`

## History

**v0.2.1**

Questions without a namespace have been deprecated and will be removed in 0.3.0.

**v0.2.0**

Refactored to work as a [base](https://github.com/node-base/base) plugin.

## About

### Related projects

* [answer-store](https://www.npmjs.com/package/answer-store): Store answers to user prompts, based on locale and/or current working directory. | [homepage](https://github.com/jonschlinkert/answer-store "Store answers to user prompts, based on locale and/or current working directory.")
* [base-questions](https://www.npmjs.com/package/base-questions): Plugin for base-methods that adds methods for prompting the user and storing the answers on… [more](https://github.com/node-base/base-questions) | [homepage](https://github.com/node-base/base-questions "Plugin for base-methods that adds methods for prompting the user and storing the answers on a project-by-project basis.")
* [base](https://www.npmjs.com/package/base): base is the foundation for creating modular, unit testable and highly pluggable node.js applications, starting… [more](https://github.com/node-base/base) | [homepage](https://github.com/node-base/base "base is the foundation for creating modular, unit testable and highly pluggable node.js applications, starting with a handful of common methods, like `set`, `get`, `del` and `use`.")
* [question-cache](https://www.npmjs.com/package/question-cache): A wrapper around inquirer that makes it easy to create and selectively reuse questions. | [homepage](https://github.com/jonschlinkert/question-cache "A wrapper around inquirer that makes it easy to create and selectively reuse questions.")
* [question-store](https://www.npmjs.com/package/question-store): Ask questions, persist the answers. Basic support for i18n and storing answers based on current… [more](https://github.com/jonschlinkert/question-store) | [homepage](https://github.com/jonschlinkert/question-store "Ask questions, persist the answers. Basic support for i18n and storing answers based on current working directory.")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Building docs

_(This document was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme) (a [verb](https://github.com/verbose/verb) generator), please don't edit the readme directly. Any changes to the readme must be made in [.verb.md](.verb.md).)_

To generate the readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install -g verb verb-generate-readme && verb
```

### Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

### License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/generate/common-questions/blob/master/LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.1.30, on August 16, 2016._