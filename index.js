'use strict';

// read only for now (till I have a need to write)

var csv2array = require('csv2array'),
fs = require('fs'),
pkg = require('./package.json'),
_ = require('lodash');

module.exports = function(){

  if(arguments.length === 0) throw new Error('cannot call without arguments');

  // -- Configuration --
  var c;
  if(_.isString(arguments[0])) c = {source : arguments[0]};
  else if(_.isObject(arguments[0])) c = arguments[0];

  if(_.isUndefined(c)) throw new Error('filename string or configuration object required');

  c = _.defaults(c, {
    encoding : 'utf8',
    headers : true
  });
  if(!c.source) throw new Error('filename required');
  
  // -- Get Data --
  if(!fs.existsSync(c.source)) throw new Error('Cannot find file: ' + c.source);
  var data = csv2array(fs.readFileSync(c.source, {encoding : c.encoding}));  

  return {
    size : _.size(data),
    version : pkg.version
  };


};
