'use strict';

const { getResourcePath,
        reduceOptions,
        resolveEid }     = require('../helper');

const DEFAULT_OPTIONS = {};


/**
 * Trigger a resource.
 *
 * @param {request}
 * @param {string}
 * @param {object}
 * @param {string}
 * @param {object}
 * @return {Promise}
 */
function trigger (
  request, 
  resource, 
  copts, 
  id, 
  meta, 
  options
) {
  options = reduceOptions(options, copts, DEFAULT_OPTIONS);

  const eid = resolveEid(options),
        uri = getResourcePath(resource, { eid, id });

  return request.post({
    uri: `${uri}/trigger`,
    body: { meta }
  });
}

module.exports = trigger;
