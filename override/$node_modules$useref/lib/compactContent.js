'use strict';

var parse = require('./parseBuildBlock'),
  resources = require('./resources'),
  sectionsJoinChar = resources.sectionsJoinChar,
  regComment = resources.regComment;

function removeComments(lines) {
  return lines.join('\n').replace(regComment, '').split('\n');
}

module.exports = function (blocks) {

  var result = {};

  Object.keys(blocks).forEach(function (dest) {
    // Lines are the included scripts w/o the use blocks
    var lines = blocks[dest].slice(1, -1),
      parts = dest.split(sectionsJoinChar),
      type = parts[0],

      // output is the useref block file
      output = parts[1],
      build = parse(blocks[dest][0]),
      assets;
     
    // remove html comment blocks
    lines = removeComments(lines);

    // parse out the list of assets to handle, and update the grunt config accordingly
    assets = lines.map(function (tag) {
      // Allow white space and comment in build blocks by checking if this line has an asset or not
      // The asset is the string of the referenced source file
      return (tag.match(/(href|src)=(?:["']\W+\s*(?:\w+)\()?["']([^'"]+)['"]/) || [])[2];
    }).reduce(function (a, b) {
      return b ? a.concat(b) : a;
    }, []);

    result[type] = result[type] || {};

    result[type][output] = {
      assets: assets
    };

    if (build.alternateSearchPaths) {
      // Alternate search path
      result[type][output].searchPaths = build.alternateSearchPaths;
    }
  });

  return result;
};
