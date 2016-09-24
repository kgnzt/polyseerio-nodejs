'use strict';

const { getResourcePath,
        createOptions,
        resolveEid } = require('../helper');

const DEFAULT_OPTIONS = {};

/**
 * Create a message method for a resource.
 *
 * @param {request} options
 * @param {string} resource type
 * @return {function}
 */
function message (request, resource) {
  /**
   * Create a message.
   *
   * @param {string}
   * @param {object}
   * @param {object}
   * @return {Promise}
   */
  return (id, content, options) => {
    options = createOptions(options, DEFAULT_OPTIONS);

    const eid = resolveEid(options),
          uri = getResourcePath(resource, { eid, id });

    return request.post({
      uri: `${uri}/messages`,
      body: {
        content
      }
    });
  };
}

module.exports = message;
