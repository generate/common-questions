'ues strict';

var ask = require('base-questions');
var Base = require('base');
var questions = require('./');

var app = new Base({isApp: true});
app.use(ask());
app.use(questions());

app.ask({save: false}, function(err, answers) {
  if (err) return console.error(err);
  console.log(answers);
});
