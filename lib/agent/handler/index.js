'use strict';

const { requireDirectory } = require('../../helper');

const METHOD_EXT = '.js',
      EXCLUDE = ['index'];

// need default pred / iteratee added to require dir...
function predicate (pathObject) {
  return (pathObject.ext === METHOD_EXT && 
    EXCLUDE.indexOf(pathObject.name) === -1);
}

function iteratee (pathObject) {
  return {
    name: pathObject.name,
    require: `${__dirname}/${pathObject.name}`
  };
}

module.exports = requireDirectory(__dirname, predicate, iteratee);
