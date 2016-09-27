'use strict';

const { getResourcePath,
        reduceOptions,
        resolveEid }  = require('../helper');

const DEFAULT_OPTIONS = {};

/**
 * Find a resource by primary id.
 *
 * @param {request}
 * @param {string}
 * @param {object}
 * @param {string}
 * @param {object}
 * @return {Promise}
 */
function findById (
  request, 
  resource, 
  copts,
  id,
  options
) {
  options = reduceOptions(options, copts, DEFAULT_OPTIONS);

  const eid = resolveEid(options),
        uri = getResourcePath(resource, { eid, id });

  return request.get({
    uri
  });
}

module.exports = findById;
