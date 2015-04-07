/*
 * grunt-predicsis-api-stub
 * https://github.com/yllieth/grunt-predicsis-api-stub
 *
 * Copyright (c) 2015 Sylvain
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    predicsis_api_stub: {
      options: {
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:8002',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
          'Access-Control-Allow-Headers': 'x-from-state,content-type,authorization,cache-control,x-requested-with,x-mock-response,x-body-sent',
          'Access-Control-Allow-Credentials': true
        }
      },
      endpoints: {
        s3: { port: 8005 },
        api: { port: 8003 },
        oauth: { port: 8004 },
        identity: { port: 8002 }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'predicsis_api_stub', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
