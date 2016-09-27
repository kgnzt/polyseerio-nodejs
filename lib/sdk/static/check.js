'use strict';

const { getResourcePath,
        reduceOptions,
        resolveEid } = require('../helper');

const DEFAULT_OPTIONS = {};

/**
 * Check a resource.
 *
 * Used for expecations.
 *
 * @param {request}
 * @param {string}
 * @param {object}
 * @param {object}
 * @return {Promise}
 */
function check (
  request, 
  resource,
  copts,
  options
) {
  options = reduceOptions(options, copts, DEFAULT_OPTIONS);

  const eid = resolveEid(options),
        uri = getResourcePath(resource, { eid });

  return request.get({
    uri: `${uri}/check`
  });
}

module.exports = check;
