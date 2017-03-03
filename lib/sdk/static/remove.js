'use strict';

/**
 * Remove a resource.
 *
 * @param {string}
 * @param {object}
 * @param {object}
 * @return {Promise}
 */

function remove(id, options) {
  var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return context.request.del({ uri: context.uri });
}

module.exports = remove;