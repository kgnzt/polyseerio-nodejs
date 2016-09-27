'use strict';

const { getResourcePath,
        reduceOptions,
        resolveEid } = require('../helper');

const DEFAULT_OPTIONS = {};

/**
 * Create a resource.
 *
 * @param {request}
 * @param {string}
 * @param {object}
 * @param {string}
 * @param {object}
 * @return {Promise}
 */
function create (
  request, 
  resource, 
  copts,
  attributes,
  options
) {
  options = reduceOptions(options, copts, DEFAULT_OPTIONS);

  const eid = resolveEid(options),
        uri = getResourcePath(resource, { eid });

  return request.post({
    uri,
    body: attributes
  });
}

module.exports = create;
