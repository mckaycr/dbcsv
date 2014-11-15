'use strict';

/* global describe, it, should */
/* jshint expr: true */

var dbcsv = require('../'),
path = require('path'),
pkg = require('../package.json');

var filename = path.resolve(__dirname, './sample.csv');

describe('creation signatures', function(){

  it('should throw error on empty', function(){
    (function(){ 
      dbcsv(); 
    }).should.throw('cannot call without arguments');
  });

  it('should throw error if not string or object', function(){
    [4, 1.0, false, true, undefined, null].forEach(function(val){
      (function(){ 
	dbcsv(val); 
      }).should.throw('filename string or configuration object required');
    });
  });

  it('should throw error if configuration filename does not exist', function(){
    (function(){ 
      dbcsv({}); 
    }).should.throw('filename required');
  });
});

describe('creation filename', function(){

  it('should throw error on non-existent file', function(){
    (function(){ 
      dbcsv('./missingfilename.csv'); 
    }).should.throw(/missingfilename/);

    (function(){ 
      dbcsv({filename : './missingfilename.csv'}); 
    }).should.throw(/missingfilename/);
  });

}); 

describe('version()', function(){
  it('should have same version as package', function(){
    pkg.version.should.equal(dbcsv(filename).version);
  });
});

describe('size()', function(){
  it('sample data size', function(){
    dbcsv(filename).size.should.eql(4);
  });
});
