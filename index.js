'use strict';

var pkg = require('./package.json');

module.exports = function(config){
  
  var data = [];

  function length(){
    return data.length;
  }
  
  return {
    length : length,
    version : pkg.version
  };


};
