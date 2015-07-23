'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
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
          src: ['css/<%= pkg.name %>.css', 'css/<%= pkg.name %>.min.css', 'js/<%= pkg.name %>.min.js']
        }
      }
    },
    watch: {
      scripts: {
        files: ['js/<%= pkg.name %>.js'],
        tasks: ['uglify'],
        options: {
          spawn: false,
        },
      },
      less: {
        files: ['less/*.less'],
        tasks: ['less'],
        options: {
          spawn: false,
        }
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('img', ['imagemin']);
  grunt.registerTask('default', ['img']);
};
