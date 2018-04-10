'use strict';

var resources = require('./resources');

module.exports = function (block) {
  var parts = block.match(resources.regbuild);

var type = parts[1];
var output = parts[2];
  if(!type && output){
    var suffix = output.split('.').pop();
    type = suffix;
  }
  
  return {
    type: type,
    alternateSearchPaths: undefined,
    target: output.trim(),
    attbs: undefined
  };
};
