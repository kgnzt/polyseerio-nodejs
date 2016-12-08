'use strict';


const jshintReporter = require('jshint-junit-reporter'),
      lintableFiles  = ['example/**/*.js', 'example/**/*.json', 'test/**/*.js', 'lib/**/*.js'],
      unitTestFiles  = ['test/unit/**/*_test.js'],
      integrationTestFiles  = ['test/integration/**/*_test.js'],
      validationTestFiles  = ['test/validation/**/*_test.js'];

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'dist/s': 'lib/**/*.js'
        }
      }
    },
    mochaTest: {
      integration_stdout: {
        options: {
          reporter: 'spec'
        },
        src: integrationTestFiles
      },
      validation_stdout: {
        options: {
          reporter: 'spec'
        },
        src: validationTestFiles
      },
      unit_stdout: {
        options: {
          reporter: 'spec'
        },
        src: unitTestFiles
      },
      unit_file: {
        options: {
          reporter: 'xunit',
          quiet: true,
          captureFile: './unit_test_results.xml'
        },
        src: unitTestFiles
      }
    },
    jshint: {
      options: {
        esnext: true,
        node: true,
        globals: {
          describe: false,
          it: false,
          before: false,
          beforeEach: false,
          after: false,
          afterEach: false
        }
      },
      stdout: {
        files: { src: lintableFiles }
      },
      file: {
        files: { src: lintableFiles },
        options: {
           reporterOutput: 'lint_test_results.xml',
           reporter: jshintReporter
        }
      }
    }
  });

  grunt.registerTask('compile', ['babel']);
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
};
