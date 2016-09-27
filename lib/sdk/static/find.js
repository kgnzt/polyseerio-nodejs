'use strict';

const { getResourcePath,
        reduceOptions,
        resolveEid }  = require('../helper');

const DEFAULT_OPTIONS = {};

/**
 * Find a collection of a resource type.
 *
 * @param {request}
 * @param {string}
 * @param {object}
 * @param {string}
 * @param {object}
 * @return {Promise}
 */
function find (
  request, 
  resource, 
  copts,
  query,
  options
) {
  options = reduceOptions(options, copts, DEFAULT_OPTIONS);

  const eid = resolveEid(options),
        uri = getResourcePath(resource, { eid });

  return request.get({
    qs: query,
    uri
  });
}

module.exports = find;
