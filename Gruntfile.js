'use strict';

module.exports = function(grunt){

  grunt.initConfig({
    jshint : {
      options : {
	"node" : true
      },
      files : ['./Gruntfile.js','./package.json','./index.js', 'test/*.js', 'example/*.js']
    },
    test : {
      options : {
	require : ['should'],
	ui : 'bdd',
	reporter : 'spec'
      },
      all : {
	src : 'test/index.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-cafe-mocha');
  grunt.renameTask('cafemocha', 'test');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint', 'test']);
};
