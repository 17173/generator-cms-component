
define(function(require, exports, module) {
  var $ = require('$');
  var Handlebars = require('handlebars');

  var data = require('./src/widget.json');
  var template = require('./src/widget.handlebars');


  var html = template({widget:data});
  $('#content').html(html);
});