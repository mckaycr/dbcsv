'use strict';

module.exports = function(grunt){

  grunt.initConfig({
    jshint : {
      options : {
	"node" : true
      },
      files : ['./Gruntfile.js','./package.json','./index.js', 'test/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint']);
};
