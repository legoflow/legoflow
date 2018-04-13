'use strict';

var parseBuildBlock = require('./parseBuildBlock'),
  bb = {};

module.exports = {
  setBuildBlock: function (block, options) {
    var props = parseBuildBlock(block);

    bb.handler = options && options[props.type];
    bb.target = props.target || 'replace';
    bb.type = props.type;
    bb.attbs = props.attbs;
    bb.alternateSearchPaths = props.alternateSearchPaths;
  },

  transformCSSRefs: function (block, target, attbs) {
    var ref = '';

    // css link element regular expression
    // TODO: Determine if 'href' attribute is present.
    var regcss = /<?link.*?(?:>|\))/gmi;

    // Check to see if there are any css references at all.
    if (block.search(regcss) !== -1) {
      if (attbs) {
        ref = '<link rel="stylesheet" href="' + target + '" ' + attbs + '>';
      } else {
        ref = '<link rel="stylesheet" href="' + target + '">';
      }
    }

    return ref;
  },

  transformJSRefs: function (block, target, attbs) {
    var ref = '';

    // script element regular expression
    // TODO: Detect 'src' attribute.
    var regscript = /<?script\(?\b[^<]*(?:(?!<\/script>|\))<[^<]*)*(?:<\/script>|\))/gmi;

    // Check to see if there are any js references at all.
    if (block.search(regscript) !== -1) {
      if (attbs) {
        ref = '<script src="' + target + '" ' + attbs + '></script>';
      } else {
        ref = '<script src="' + target + '"></script>';
      }
    }

    return ref;
  },

  getRef: function (block, blockContent, options) {
    var ref = '';

    this.setBuildBlock(block, options);

    if (bb.type === 'css') {
      ref = this.transformCSSRefs(blockContent, bb.target, bb.attbs);
    } else if (bb.type === 'js') {
      ref = this.transformJSRefs(blockContent, bb.target, bb.attbs);
    } else if (bb.type === 'remove') {
      ref = '';
    } else if (bb.handler) {
      ref = bb.handler(blockContent, bb.target, bb.attbs, bb.alternateSearchPaths);
    } else {
      ref = null;
    }

    return ref;
  }
};
