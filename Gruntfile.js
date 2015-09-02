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
      }
    },
    compile: {
      "sectv-orsay": {
          //dest: "platform_www/sectv-orsay/toast.js" // default
      },
      "sectv-tizen": {
          //dest: "platform_www/sectv-tizen/toast.js" // default
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadTasks('tasks');

  // Default task(s).
  grunt.registerTask('default', ['jshint:src', 'compile', 'jshint:build']);
};
