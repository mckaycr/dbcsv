'use strict';

// read only for now (till I have a need to write)

var csv2array = require('csv2array'),
fs = require('fs'),
pkg = require('./package.json'),
_ = require('lodash');

module.exports = function(){

  if(arguments.length === 0) throw new Error('cannot call without arguments');

  // -- Configuration --
  var config;
  if(_.isString(arguments[0])) config = {filename : arguments[0]};
  else if(_.isObject(arguments[0])) config = arguments[0];

  if(_.isUndefined(config)) throw new Error('filename string or configuration object required');

  var configuration = _.defaults({}, config, {
    encoding : 'utf8',
    headers : true
  });
  if(!configuration.filename) throw new Error('filename required');
  
  // Get CSV File
  if(!fs.existsSync(configuration.filename)) throw new Error('Cannot find file: ' + configuration.filename);

  var data = csv2array(
    fs.readFileSync(configuration.filename, {encoding : configuration.encoding}),
    {
      headers : configuration.headers
    });
  console.log(data);
  
  return {
    size : _.size(data),
    version : pkg.version
  };


};
