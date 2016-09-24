'use strict';

const { getResourcePath,
        reduceOptions,
        resolveEid } = require('../helper');

const DEFAULT_OPTIONS = {};

/**
 * Create a find by name method for a resource.
 *
 * @param {request} options
 * @param {string} resource type
 * @return {function}
 */
function findById (request, resource, clientOptions) {
  /**
   * Find a resource by its name.
   *
   * @param {object} options
   * @return {Promise}
   */
  return (name, options) => {
    options = reduceOptions(options, clientOptions, DEFAULT_OPTIONS);

    const eid = resolveEid(options),
          uri = getResourcePath(resource, { eid });

    name = name ? `/name/${name}` : `/${eid}`;

    return request.get({
      uri: `${uri}${name}`
    });
  };
}

module.exports = findById;
