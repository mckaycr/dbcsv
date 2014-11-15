'use strict';

/* global describe, it, should */
/* jshint expr: true */

var dbcsv = require('../'),
path = require('path'),
pkg = require('../package.json');

var filename = path.resolve(__dirname, './sample.csv');

describe('creation signatures', function(){

  var err = 'source filename required';

  it('should throw error if not string or object', function(){
    [4, 1.0, false, true, undefined, null].forEach(function(val){
      (function(){ 
	dbcsv(val); 
      }).should.throw(err);
    });
  });

  it('should throw error if source filename is not supplied', function(){
    (function(){ 
      dbcsv(); 
    }).should.throw(err);
  });
});

describe('creation filename', function(){

  it('should throw error on non-existent source file', function(){
    (function(){ 
      dbcsv('./missingfilename.csv'); 
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
    dbcsv(filename).size.should.eql(3);
  });
});

describe('configuration options', function(){
  describe('headers', function(){
    it('should remove headers by default', function(){
      var db = dbcsv(filename);
      db.size.should.eql(3);
      db.headers.should.eql(['id','threshold','description']);
    });
    it('should not remove headers if {headers : false}', function(){
      var db = dbcsv(filename, {headers : false});
      db.size.should.eql(4);
      db.headers.should.eql([0,1,2]);
    });
  });

  describe('headers lower', function(){
    it('should lowercase headers by default', function(){
      var db = dbcsv(filename);
      db.headers.should.eql(['id','threshold','description']);      
    });
    it('should not lowercase headers if {headersLower : false}', function(){
      var db = dbcsv(filename, {headersLower : false});
      db.headers.should.eql(['Id','Threshold','Description']);      
    });
  });
 
  describe('trim', function(){
    it('should trim headers by default', function(){
      var db = dbcsv(filename);
      db.headers.should.eql(['id','threshold','description']);      
    });
    it('should not trim headers if {trim : false}', function(){
      var db = dbcsv(filename, {trim : false});
      db.headers.should.eql(['id',' threshold',' description']);      
    });
  });
  // xx -- test trim config option in data too

});

describe('column()', function(){
  var db = dbcsv(filename);
  it('should return entire column', function(){
    db.column('id').should.eql(['1','2','3']);
    db.column(0).should.eql(['1','2','3']);
  });
});
