'use strict';

const { getResourcePath,
        reduceOptions,
        resolveEid  } = require('../helper');

const DEFAULT_OPTIONS = {};

/**
 * Update a resource.
 *
 * @param {request}
 * @param {string}
 * @param {object}
 * @param {string}
 * @param {object}
 * @param {object}
 * @return {Promise}
 */
function update (
  request, 
  resource, 
  copts, 
  id, 
  updates, 
  options
) {
  options = reduceOptions(options, copts, DEFAULT_OPTIONS);

  const eid = resolveEid(options),
        uri = getResourcePath(resource, { eid, id });

  return request.put({
    uri,
    body: updates
  });
}

module.exports = update;
