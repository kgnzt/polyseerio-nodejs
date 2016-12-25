'use strict';

/**
 * Create a resource.
 *
 * @param {object}
 * @param {object}
 * @param {object}
 * @return {Promise}
 */
function create (attributes, options, context = {}) {
  attributes = attributes || {};

  return context.request.post({
    uri: context.uri,
    body: attributes
  });
}

module.exports = create;
