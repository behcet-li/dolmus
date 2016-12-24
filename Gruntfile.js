'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    imagemin: {
      png: {
        options: {
          optimizationLevel: 7
        },
        files: [{
          // Set to true to enable the following options…
          expand: true,
          cwd: '_site/img/',
          src: ['**/*.png'],
          dest: '_site/img/',
          ext: '.png'
        }]
      },
      jpg: {
        options: {
          progressive: true
        },
        files: [{
          // Set to true to enable the following options…
          expand: true,
          cwd: '_site/',
          src: ['**/*.jpg'],
          dest: '_site/',
          ext: '.jpg'
        }]
      },
    },
    banner: '/*!\n' +
    ' * <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
    ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
    ' * Licensed under <%= pkg.license %> (https://spdx.org/licenses/<%= pkg.license %>)\n' +
    ' */\n',
    usebanner: {
      dist: {
        options: {
          position: 'top',
          banner: '<%= banner %>'
        },
        files: {
          src: [
            '_site/assets/**.css',
            '_site/assets/**.js'
          ]
        }
      }
    },
    watch: {
      scripts: {
        files: ['_site/img/**.jpg'],
        tasks: ['default'],
        options: {
          spawn: false,
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['imagemin', 'usebanner']);
};
