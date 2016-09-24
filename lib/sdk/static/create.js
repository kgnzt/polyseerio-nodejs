'use strict';

const { getResourcePath,
        reduceOptions,
        resolveEid } = require('../helper');

const DEFAULT_OPTIONS = {};

/**
 * Create a create method for a resource.
 *
 * @param {request} options
 * @param {string} resource type
 * @return {function}
 */
function create (request, resource, clientOptions) {
  /**
   * Create a resource.
   *
   * @param {object} options
   * @return {Promise}
   */
  return (attributes, options) => {
    options = reduceOptions(options, clientOptions, DEFAULT_OPTIONS);

    const eid = resolveEid(options),
          uri = getResourcePath(resource, { eid });

    return request.post({
      uri,
      body: attributes
    });
  };
}

module.exports = create;
