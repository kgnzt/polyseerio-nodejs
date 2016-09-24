'use strict';

const { getResourcePath,
        reduceOptions,
        resolveEid } = require('../helper');

const DEFAULT_OPTIONS = {};

/**
 * Create a find method for a resource.
 *
 * @param {request} options
 * @param {string} resource type
 * @return {function}
 */
function findById (request, resource, clientOptions) {
  /**
   * Find a resource by its id.
   *
   * @param {object} options
   * @return {Promise}
   */
  return (id, options) => {
    options = reduceOptions(options, clientOptions, DEFAULT_OPTIONS);

    const eid = resolveEid(options),
          uri = getResourcePath(resource, { eid, id });

    return request.get({
      uri
    });
  };
}

module.exports = findById;
