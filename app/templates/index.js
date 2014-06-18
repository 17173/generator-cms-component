
define(function(require, exports, module) {
  var $ = require('$');
  var Handlebars = require('handlebars');

  var data = require('./src/component.json');
  var template = require('./src/component.handlebars');

  require('./src/component.css');

  var html = template(data);
  $('#content').html(html);
});