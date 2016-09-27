'use strict';

const { ENVIRONMENT } = require('../../resource'),
      { getResourcePath,
        reduceOptions,
        resolveEid }  = require('../helper');

const DEFAULT_OPTIONS = {};

/**
 * Find a resource by name.
 *
 * @param {request}
 * @param {string}
 * @param {object}
 * @param {string}
 * @param {object}
 * @return {Promise}
 */
function findByName (
  request, 
  resource, 
  copts, 
  name, 
  options
) {
  options = reduceOptions(options, copts, DEFAULT_OPTIONS);
  name = `/name/${name}`;

  const eid = resolveEid(options);
  
  let uri = getResourcePath(resource, { eid });

  uri = (resource === ENVIRONMENT) ? `/environments${name}` : `/${uri}${name}`;

  return request.get({
    uri
  });
}

module.exports = findByName;
