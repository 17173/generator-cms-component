'use strict';
var util = require('util');
var path = require('path');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');


var CmsWidgetGenerator = module.exports = function CmsWidgetGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(CmsWidgetGenerator, yeoman.generators.Base);

CmsWidgetGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  var welcome =
    '\n     _-----_' +
    '\n    |       |' +
    '\n    |' + chalk.red('--(o)--') + '|   .--------------------------.' +
    '\n   `---------´  |    ' + chalk.yellow.bold('Welcome to yo cms-widget') + ',    |' +
    '\n    ' + chalk.yellow('(') + ' _' + chalk.yellow('´U`') + '_ ' + chalk.yellow(')') + '   |   ' + chalk.yellow.bold('ladies and gentlemen!') + '  |' +  '\n    /___A___\\   \'__________________________\'' +
    '\n     ' + chalk.yellow('|  ~  |') +
    '\n   __' + chalk.yellow('\'.___.\'') + '__' +
    '\n ´   ' + chalk.red('`  |') + '° ' + chalk.red('´ Y') + ' `\n';

  console.log(welcome);

  if (this.options.promptDefaults) {
    this.name = this.options.promptDefaults.name;
    this.description = this.options.promptDefaults.description;
    this.version = this.options.promptDefaults.version;
    cb();
    return;
  }

  var prompts = [{
    name: 'name',
    message: 'What is the name of your widget?',
    default: this.appname
  }, {
    name: 'description',
    message: 'Your widget description',
    default: 'cms widget'
  }, {
    name: 'version',
    message: 'Your widget version',
    default: '1.0.0'
  }];

  this.prompt(prompts, function (props) {
    this.name = props.name;
    this.description = props.description;
    this.version = props.version;

    cb();
  }.bind(this));
};

CmsWidgetGenerator.prototype.app = function app() {
  this.directory('src', 'src');
  this.directory('sea-modules', 'sea-modules');

  this.copy('_package.json', 'package.json');
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('Gruntfile.js', 'Gruntfile.js');
  this.copy('index.html', 'index.html');
  this.copy('index.js', 'index.js');
  this.copy('.gitignore', '.gitignore');
  this.copy('README.md', 'README.md');
};

