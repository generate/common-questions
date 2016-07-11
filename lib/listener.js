
var utils = require('./utils');
var hints = require('./hints');

module.exports = function listener(app, options) {
  if (!utils.isValid(app, 'common-questions-listener')) return;

  app.on('ask', function(val, key, question) {
    if (hints.disabled(app, options, val, key, question)) {
      return;
    }

    if (typeof val === 'undefined') {
      var data = hints(app, options);
      val = data[key] || app.common.get(key);
    }

    if (typeof val !== 'undefined' && typeof question.setAnswer === 'function') {
      question.default = val;
      app.questions.answers[key] = val;
      question.setAnswer(val);
    }
  });
};
