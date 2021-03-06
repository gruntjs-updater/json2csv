/*
 * grunt-json2csv
 * https://github.com/licaon/json2csv
 *
 * Copyright (c) 2015 Raul Macarie
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

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
        json2csv: {
            convert2json: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['test/fixtures/{,*/}*.csv'],
                    dest: 'tmp/convert2json',
                    ext: '.json'
                }]
            },
            convert2csv: {
                options: {
                    wrapper: '"',
                    delimiter: ','
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['test/fixtures/{,*/}*.json'],
                    dest: 'tmp/convert2csv',
                    ext: '.csv'
                }]
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
    grunt.registerTask('test', ['clean', 'json2csv', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'clean', 'json2csv']);

};
