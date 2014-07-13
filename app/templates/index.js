
define(function(require, exports, module) {
  var $ = require('$');
  var helpers = require('handlebars-helpers');

  var data = require('./src/component.json');
  var template = require('./src/component.handlebars');

  require('./src/component.css');

  var html = template(data, {
    helpers: helpers
  });
  $('#content').html(html);
  autoRender && autoRender();
});