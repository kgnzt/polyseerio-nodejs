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
function find (request, resource, clientOptions) {
  /**
   * Find a resource.
   *
   * @param {object} query params
   * @param {object}
   * @return {Promise}
   */
  return (qs, options) => {
    options = reduceOptions(options, clientOptions, DEFAULT_OPTIONS);

    const eid = resolveEid(options),
          uri = getResourcePath(resource, { eid });

    return request.get({
      qs,
      uri
    });
  };
}

module.exports = find;
