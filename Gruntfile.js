module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compile: {
      "sectv-orsay": {
          //dest: "platform_www/sectv-orsay/toast.js" // default
      },
      "sectv-tizen": {
          //dest: "platform_www/sectv-tizen/toast.js" // default
      }
    }
  });

  grunt.loadTasks('tasks');

  // Default task(s).
  grunt.registerTask('default', ['compile']);
};
