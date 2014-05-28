
define(function(require, exports, module) {
  var $ = require('$');
  var Handlebars = require('handlebars');

  var data = require('./src/widget.json');
  var template = require('./src/widget.handlebars');

  require('./src/widget.css');

  var html = template(data);
  $('#content').html(html);
});