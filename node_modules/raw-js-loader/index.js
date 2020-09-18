/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Daqi Song
*/
var hljs = require('highlight.js');

module.exports = function(content, map) {
  this.cacheable && this.cacheable();

  var resultCode = '';

  this.value = map.sourcesContent[0];
  var sourceCode = map.sourcesContent[0];

  // 原样输出
  if ( /type=normal/.test(this.query)) {
    resultCode = sourceCode;
  } else if (/type=compiled/.test(this.query)) {
    resultCode = content;
  } else {
    resultCode = hljs.highlight('javascript', sourceCode).value;
  }

  return "module.exports = " + JSON.stringify(resultCode);
}

module.exports.seperable = true;