'use strict';

const { getResourcePath,
        reduceOptions,
        resolveEid }     = require('../helper');

/**
 * Establish a resource fact.
 *
 * @param {request}
 * @param {string}
 * @param {object}
 * @param {string}
 * @param {object}
 * @return {Promise}
 */
function fact (
  request, 
  resource, 
  copts, 
  id, 
  facts, 
  options
) {
  options = reduceOptions(options, copts);

  const eid = resolveEid(options),
        uri = getResourcePath(resource, { eid, id });

  return request.post({
    uri: `${uri}/facts`,
    body: facts
  });
}

module.exports = fact;
