'use strict';
var util = require('util');
var path = require('path');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var ENUM = {
  'NEWS_LIST': 'news-list',
  'IMAGE_LIST': 'image-list',
  'GRAPHIC_LIST': 'graphic-list',
  'VIDEO_LIST': 'video-list',
  'IMAGE_SWITCH': 'image-switch',
  'SINGLE_IMAGE': 'single-image',
  'TAB': 'tab',
  'RANKING': 'ranking',
  'MENU': 'menu',
  'GALLERY': 'gallery'
}

var CmsWidgetGenerator = module.exports = function CmsWidgetGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    //this.installDependencies({ skipInstall: options['skip-install'] });
    var info = chalk.yellow.bold("\nI'm all done. Please running cnpm install & spm install for you to install the required dependencies.")
    console.log(info);
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
    '\n   `---------´  |    ' + chalk.yellow.bold('Welcome to yo cms-component') + ',    |' +
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
    message: 'What is the name of your component?',
    default: this.appname
  }, {
    name: 'description',
    message: 'Your component description',
    default: 'cms component'
  }, {
    name: 'version',
    message: 'Your component version',
    default: '1.0.0'
  }];

  this.prompt(prompts, function (props) {
    this.name = props.name;
    this.description = props.description;
    this.version = props.version;

    cb();
  }.bind(this));
};

CmsWidgetGenerator.prototype.askForSelect = function askForSelect() {
  var done = this.async();
  var prompts = [
    {
      type:'list',
      name: 'componentType',
      message:'选择模板类型',
      choices:[
        {
          name: '新闻列表',
          value: ENUM.NEWS_LIST
        }, {
          name: '图片列表',
          value: ENUM.IMAGE_LIST
        }, {
          name: '图文列表',
          value: ENUM.GRAPHIC_LIST
        }, {
          name: '视频列表',
          value: ENUM.VIDEO_LIST
        }, {
          name: '图片轮播',
          value: ENUM.IMAGE_SWITCH
        }, {
          name: '单张图片',
          value: ENUM.SINGLE_IMAGE
        }, {
          name: '排行榜',
          value: ENUM.RANKING
        }, {
          name: '导航菜单',
          value: ENUM.MENU
        }, {
          name: 'Tab组件',
          value: ENUM.TAB
        }, {
          name: '组图组件',
          value: ENUM.GALLERY
        }
      ]
    }
  ];

  this.prompt(prompts, function (props) {
    //this.componentType = getComponentType(props);
    this.componentType = props.componentType;

    done();
  }.bind(this));
};

function getComponentType(props) {
  var choices = props.componentType;
  console.log(choices)
  var type;
  var ret;

  for(type in ENUM) {
    if (choices.indexOf(type) !== -1) {
      ret = type;
      break;
    }
  }

  return ret;

}

CmsWidgetGenerator.prototype.app = function app() {
  this.directory(this.componentType, 'src');
  this.copy('_package.json', 'package.json');
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('Gruntfile.js', 'Gruntfile.js');
  this.copy('index.html', 'index.html');
  this.copy('index.js', 'index.js');
  this.copy('.gitignore', '.gitignore');
  this.copy('README.md', 'README.md');
};

