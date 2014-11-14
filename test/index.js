'use strict';

/* global describe, it, should */
/* jshint expr: true */

var dbcsv = require('../');

var pkg = require('../package.json');

describe('version()', function(){
  it('should have same version as package', function(){
    pkg.version.should.equal(dbcsv().version);
  });
});
