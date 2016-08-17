
var utils = require('./utils');
var hints = require('./hints');

module.exports = function listener(app, options) {
  if (!utils.isValid(app, 'common-questions-listener')) return;

  app.on('ask', function(val, key, question) {
    if (hints.disabled(app, options, val, key, question)) {
      return;
    }

    if (typeof val === 'undefined' && typeof app.common !== 'undefined') {
      var data = hints(app, options);
      question.answer = data[key] || app.common.get(key);
    }
  });
};
