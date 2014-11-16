'use strict';

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

  // we read the file contents and csv2array does the actual parsing-to-array work
  var data = csv2array(
    fs.readFileSync(c.source, {encoding : c.encoding}),
    {});  

  // -- Deal With Headers --

  var headers;
  if(c.headers){
    headers = data.shift();
    if(c.trim) headers = _.invoke(headers, 'trim');
    if(c.headersLower) headers = _.invoke(headers, 'toLowerCase');

    // xx - if headers < max columns, pad headers?
  }
  // if headers are undefined after this we know headers are not in use
  
  // now that headers are gone we can establish db dimensions, use the longest row to establish 
  // number of columns
  var numColumns = _.max(data, 'length').length;
  var numRows = _.size(data);
  
  // create data object as multiple indexed object both columns and headers if enabled
  var columnRange = _.range(numColumns);
  data = _.map(data, function(d){
    if(c.trim) d = _.invoke(d, 'trim');
    var byHeader = (headers ? _.zipObject(headers, d) : {});
    var byIndex = _.zipObject(columnRange,d);
    return _.merge(byHeader, byIndex);
  });

  // this function undoes the multiple indexing of the data objects, and returns it single indexed
  // object, choice of keys depends on headers being enabled or not
  // this is used to fix the data representation before returning data
  function isolate(row){
    return _.pick(row, (headers ? headers : columnRange)); 
  }

  return {
// properties of db
    headers : _.clone((headers ? headers : columnRange)),
    numColumns : numColumns,
    size : numRows,
    version : pkg.version,
// methods of db
    column : function(key){
      return _.pluck(data, key);
    },
    row : function(index){
      return isolate(data[index]);
    },
    search : function(query){
      if(_.isFunction(query)) return _.chain(data).filter(query).map(isolate).valueOf();
      return _.chain(data).where(query).map(isolate).valueOf();
    }
  };
};
