'use strict';

/* global describe, it, should */
/* jshint expr: true */

// xx -- more tests for out of bounds and empty data sets

var dbcsv = require('../'),
path = require('path'),
pkg = require('../package.json'),
_ = require('lodash');



var sampleRowCount = 5;


var samples = {};
['standard', 'quoted', 'piped'].forEach(function(k){
  samples[k] = path.resolve(__dirname, './samples/' + k + '.csv');
});

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
    pkg.version.should.equal(dbcsv(samples.standard).version);
  });
});

describe('size()', function(){
  it('sample data size', function(){
    dbcsv(samples.standard).size.should.eql(sampleRowCount-1);
  });
});

describe('configuration options', function(){
  describe('headers', function(){
    it('should remove headers by default', function(){
      var db = dbcsv(samples.standard);
      db.size.should.eql(sampleRowCount-1);
      db.headers.should.eql(['id','threshold','description']);
    });
    it('should not remove headers if {headers : false}', function(){
      var db = dbcsv(samples.standard, {headers : false});
      db.size.should.eql(sampleRowCount);
      db.headers.should.eql([0,1,2]);
    });
  });

  describe('headers lower', function(){
    it('should lowercase headers by default', function(){
      var db = dbcsv(samples.standard);
      db.headers.should.eql(['id','threshold','description']);      
    });
    it('should not lowercase headers if {headersLower : false}', function(){
      var db = dbcsv(samples.standard, {headersLower : false});
      db.headers.should.eql(['Id','Threshold','Description']);      
    });
  });
 
  describe('trim', function(){
    it('should trim headers by default', function(){
      var db = dbcsv(samples.standard);
      db.headers.should.eql(['id','threshold','description']);      
    });
    it('should not trim headers if {trim : false}', function(){
      var db = dbcsv(samples.standard, {trim : false});
      db.headers.should.eql(['id',' threshold',' description']);      
    });
  });
  // xx -- test trim config option in data too

});

describe('column()', function(){
  var db = dbcsv(samples.standard);
  it('should return entire column', function(){
    db.column('id').should.eql(['1','2','3','4']);
    db.column(0).should.eql(['1','2','3','4']);
  });
});

describe('row()', function(){
  it('should return single row indexed by header', function(){
    var db = dbcsv(samples.standard);
    db.row(0).should.eql({
      'id' : '1', 
      'threshold' : '5.0',
      'description' : 'This is the first row of data'
    });
  });

  it('should return single row indexed by columns', function(){
    var db = dbcsv(samples.standard, {headers : false});
    db.row(1).should.eql({
      0 : '1', 
      1 : '5.0',
      2 : 'This is the first row of data'
    });
  });
});

describe('search()', function(){
  describe('with object', function(){
    it('should return matching rows indexed by header', function(){
      var db = dbcsv(samples.standard);
      db.search({'id' : '1'}).should.eql([{
	'id' : '1', 
	'threshold' : '5.0',
	'description' : 'This is the first row of data'
      }]);
    });
    
    it('should return matching rows indexed by column', function(){
      var db = dbcsv(samples.standard);
      db.search({'id' : '1'}).should.eql([{
	'id' : '1', 
	'threshold' : '5.0',
	'description' : 'This is the first row of data'
      }]);
  });

    it('should return multiple matching rows indexed by column', function(){
      var db = dbcsv(samples.standard);
      db.search({'threshold' : '3.0'}).should.eql([{
	'id' : '2', 
	'threshold' : '3.0',
	'description' : 'This is the second row of data'
      },{
	'id' : '4', 
	'threshold' : '3.0',
	'description' : 'This is the fourth row of data'
      }]);
    });
  });

  describe('with function', function(){
    var db = dbcsv(samples.standard);
    it('should return all data', function(){
      db.search(_.constant(true)).length.should.eql(sampleRowCount-1);
    });
    it('should return no data', function(){
      db.search(_.constant(false)).should.eql([]);
    });
    it('should return select data', function(){
      db.search(function(row){ return row.threshold == '3.0'; }).length.should.eql(2);
    });
  });
});

describe('quoted file', function(){
  it('should load a file with quotes', function(){
    dbcsv(samples.quoted).size.should.equal(sampleRowCount-1);
  });
  it('should strip quotes', function(){
    dbcsv(samples.quoted).row(3).should.eql({
      id : '4',
      'some number' : '1000',
      money : '$4.00',
      'a long string' : 'Duis autem vel.'
    });
  });
});

describe('pipe seperated file', function(){
  it('should load a file with pipes', function(){
    var db = dbcsv(samples.quoted, {seperator : '|'});
    db.size.should.equal(sampleRowCount-1);
    db.column('id').should.eql(['1','2','3','4']);
  });
});
