'use strict';

const { ENVIRONMENT } = require('../../enum').Resource;

/**
 * Find a resource by name.
 *
 * @param {string}
 * @param {object}
 * @param {string}
 * @param {object}
 * @return {Promise}
 */
function findByName (name, options, context) {
  name = `/name/${name}`;
  
  const uri = (context.resource === ENVIRONMENT) ? `/environments${name}` : `${context.uri}${name}`;

  return context.request.get({
    uri
  });
}

module.exports = findByName;
