'use strict';

const { getResourcePath,
        createOptions,
        resolveEid } = require('../helper');

const DEFAULT_OPTIONS = {};

/**
 * Create an update method for a resource.
 *
 * @param {request} options
 * @param {string} resource type
 * @return {function}
 */
function update (request, resource) {
  /**
   * Update a resource.
   *
   * @param {object} options
   * @return {Promise}
   */
  return (id, updates, options) => {
    options = createOptions(options, DEFAULT_OPTIONS);

    const eid = resolveEid(options),
          uri = getResourcePath(resource, { eid, id });

    return request.put({
      uri,
      body: updates
    });
  };
}

module.exports = update;
