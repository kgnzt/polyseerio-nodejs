'use strict';

const { getResourcePath,
        reduceOptions,
        resolveEid }     = require('../helper');

const DEFAULT_OPTIONS = {};

/**
 * Remove a resource.
 *
 * @param {request}
 * @param {string}
 * @param {object}
 * @param {string}
 * @param {object}
 * @return {Promise}
 */
function remove (
  request, 
  resource, 
  copts, 
  id, 
  options
) {
  options = reduceOptions(options, copts, DEFAULT_OPTIONS);

  const eid = resolveEid(options),
        uri = getResourcePath(resource, { eid, id });

  return request.del({
    uri
  });
}

module.exports = remove;
