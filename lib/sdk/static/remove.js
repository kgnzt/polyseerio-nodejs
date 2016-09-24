'use strict';

const { getResourcePath,
        createOptions,
        resolveEid,
        responseToInstance } = require('../helper');

const DEFAULT_OPTIONS = {};

/**
 * Create a remove method for a resource.
 *
 * @param {request} options
 * @param {string} resource type
 * @return {function}
 */
function remove (request, resource) {
  /**
   * Remove a resource.
   *
   * @param {string}
   * @param {object}
   * @return {Promise}
   */
  return (id, options) => {
    options = createOptions(options, DEFAULT_OPTIONS);

    const eid = resolveEid(options),
          uri = getResourcePath(resource, { eid, id });

    return request.del({
      uri
    });
  };
}

module.exports = remove;
