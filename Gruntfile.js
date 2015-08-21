module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compile: {
      "sectv-orsay": {
          src: ["src/sectv-orsay/**/*.js"],
          dest: "platform_www/sectv-orsay/cordova.js"
      },
      "sectv-tizen": {
          src: ["src/sectv-tizen/**/*.js"],
          dest: "platform_www/sectv-tizen/cordova.js"
      }
    }
  });

  grunt.loadTasks('tasks');

  // Default task(s).
  grunt.registerTask('default', ['compile']);
  grunt.registerTask('build', ['compile']);
};
