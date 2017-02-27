'use strict';

var _require = require('../../helper'),
    requireDirectory = _require.requireDirectory;

var METHOD_EXT = '.js',
    EXCLUDE = ['factory', 'index'];

function predicate(pathObject) {
  return pathObject.ext === METHOD_EXT && EXCLUDE.indexOf(pathObject.name) === -1;
}

function iteratee(pathObject) {
  return {
    name: pathObject.name,
    require: __dirname + '/' + pathObject.name
  };
}

module.exports = requireDirectory(__dirname, predicate, iteratee);