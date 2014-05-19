'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    //component: grunt.file.readJSON('component.json' ),
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>/index.html'
      }
    },

    watch: {
      scripts: {
        files: [
          'src/{,*/}*.json',
          'src/{,*/}*.handlebars',
          'src/{,*/}*.css',
          'src/{,*/}*.js'
        ]
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          'src/{,*/}*.css',
          'src/{,*/}*.js',
          'src/{,*/}*.json',
          'src/{,*/}*.handlebars',
          'src/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    connect: {
      options: {
        port: 8091,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '')
            ];
          }
        }
      }
    },

    zip: {
      widget: {
        cwd: 'src/',
        src: ['src/**.*'],
        dest: 'dist/widget.zip'
      }
    },
    clean: {
      dist: 'dist'
    }

  });
  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      //'clean:server',
      'connect:livereload',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('default', ['server' ]);
  grunt.registerTask('build', ['clean','zip' ]);
};