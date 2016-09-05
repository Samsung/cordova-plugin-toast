module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      src: {
        options: {
            jshintrc: '.jshintrc'
        },
        src: ['www/**/*.js', 'src/**/*.js']
      },
      build: {
        options: {
            jshintrc: '.jshintrc'
        },
        src: ['platform_www/**/*.js']
      },
      testrunner: {
        options: {
            jshintrc: '.jshintrc'
        },
        src: ['cordova-test-runner/cordova-test-runner-src/www/spec/*.js', 'cordova-test-runner/cordova-test-runner-src/www/testsuite/*.js']
      }
    },
    jscs: {
      src: {
        options: {
            config: '.jscsrc'
        },
        src: ['www/**/*.js', 'src/**/*.js']
      },
      testrunner: {
        options: {
            config: '.jscsrc'
        },
        src: ['cordova-test-runner/cordova-test-runner-src/www/spec/*.js', 'cordova-test-runner/cordova-test-runner-src/www/testsuite/*.js']
      }
    },
    compile: {
      "sectv-orsay": {
          //dest: "platform_www/sectv-orsay/toast.js" // default
      },
      "sectv-tizen": {
          //dest: "platform_www/sectv-tizen/toast.js" // default
      },
      "tv-webos": {
          //dest: "platform_www/tv-webos/toast.js" // default
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
      },
      'tv-webos': {
        files: ['www/**/*.js', 'src/tv-webos/*.js'],
        tasks: ['jshint:src', 'compile:tv-webos']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadTasks('tasks');

  // Default task(s).
  grunt.registerTask('default', ['precommit']);
  grunt.registerTask('precommit', ['jshint:src', 'jscs:src', 'jshint:testrunner', 'jscs:testrunner', 'compile', 'jshint:build']);
};
