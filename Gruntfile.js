module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      src: {
        options: {
            jshintrc: '.jshintrc',
        },
        src: ['www/**/*.js', 'src/**/*.js']
      },
      build: {
        options: {
            jshintrc: '.jshintrc',
        },
        src: ['platform_www/**/*.js']
      },
      testrunner: {
        options: {
            jshintrc: '.jshintrc',
        },
        src: ['cordova-test-runner/**/*.js']
      }
    },
    jscs: {
      src: {
        options: {
            config: '.jscsrc',
        },
        src: ['www/**/*.js', 'src/**/*.js']
      },
      build: {
        options: {
            config: '.jscsrc',
        },
        src: ['platform_www/**/*.js']
      },
      testrunner: {
        options: {
            config: '.jscsrc',
        },
        src: ['cordova-test-runner/**/*.js']
      }
    },
    compile: {
      "sectv-orsay": {
          //dest: "platform_www/sectv-orsay/toast.js" // default
      },
      "sectv-tizen": {
          //dest: "platform_www/sectv-tizen/toast.js" // default
      }
    },
    watch: {
      'sectv-orsay': {
        files: ['www/**/*.js', 'src/sectv-orsay/*.js'],
        tasks: ['jshint:src', 'compile:sectv-orsay']
      },
      'sectv-tizen': {
        files: ['www/**/*.js', 'src/sectv-tizen/*.js'],
        tasks: ['jshint:src', 'compile:sectv-tizen']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadTasks('tasks');

  // Default task(s).
  grunt.registerTask('default', ['jshint:src', 'jscs:src', 'compile', 'jshint:build']);
};
