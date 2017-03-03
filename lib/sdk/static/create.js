'use strict';

/**
 * Create a resource.
 *
 * @param {object}
 * @param {object}
 * @param {object}
 * @return {Promise}
 */

function create(attributes, options) {
  var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  attributes = attributes || {};

  return context.request.post({
    uri: context.uri,
    body: attributes
  });
}

module.exports = create;