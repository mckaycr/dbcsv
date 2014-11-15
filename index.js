'use strict';

// xx - better csv parsing options
// read only for now (till I have a need to write)

var csv2array = require('csv2array'),
fs = require('fs'),
pkg = require('./package.json'),
_ = require('lodash');

module.exports = function(source, configuration){


  // -- Configuration --
  if(!_.isString(source)) throw new Error('source filename required');

  var c = _.defaults({source : source}, configuration, {
    encoding : 'utf8',
    headers : true,
    trim : true,
    headersLower : true
  });

  // -- Get Data --
  if(!fs.existsSync(c.source)) throw new Error('Cannot find file: ' + c.source);
  var data = csv2array(
    fs.readFileSync(c.source, {encoding : c.encoding}),
    {});  

  // associate data by column index (and header if headers)
  var headers;
  if(c.headers){
    headers = data.shift();
    if(c.trim) headers = _.invoke(headers, 'trim');
    if(c.headersLower) headers = _.invoke(headers, 'toLowerCase');
  }
  
  var numColumns = _.max(data, 'length').length;
  var numRows = _.size(data);
  
  var columnRange = _.range(numColumns);
  data = _.map(data, function(d){
    if(c.trim) d = _.invoke(d, 'trim');
    var byHeader = (headers ? _.zipObject(headers, d) : {});
    var byIndex = _.zipObject(columnRange,d);
    return _.merge(byHeader, byIndex);
  });

  return {
    headers : _.clone((headers ? headers : columnRange)),
    numColumns : numColumns,
    size : numRows,
    version : pkg.version,
    column : function(key){
      return _.pluck(data, key);
    }
  };


};
