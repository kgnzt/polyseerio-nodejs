'use strict';

/**
 * Find a resource by primary id.
 *
 * @param {object}
 * @param {string}
 * @param {object}
 * @return {Promise}
 */

function findById(id, options) {
  var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return context.request.get({
    uri: context.uri
  });
}

module.exports = findById;