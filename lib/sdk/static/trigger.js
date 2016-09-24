'use strict';

const { getResourcePath,
        createOptions,
        resolveEid } = require('../helper');

const DEFAULT_OPTIONS = {
  deduce: true,
  env: 'NODE_ENV'
};

/**
 * Create a trigger method for a resource.
 *
 * @param {request} options
 * @param {string} resource type
 * @return {function}
 */
function trigger (request, resource) {
  /**
   * Trigger a resource.
   *
   * @param {string}
   * @param {object}
   * @param {object} options
   * @return {Promise}
   */
  return (id, meta, options) => {
    options = createOptions(options, DEFAULT_OPTIONS);

    const eid = resolveEid(options),
          uri = getResourcePath(resource, { eid, id });

    return request.post({
      uri: `${uri}/trigger`,
      body: { meta }
    });
  };
}

module.exports = trigger;
