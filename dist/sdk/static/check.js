'use strict';

/**
 * Check a resource.
 *
 * Used for expecations.
 *
 * @param {object}
 * @param {object}
 * @return {Promise}
 */

function check(options) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return context.request.get({
    uri: context.uri + '/check'
  });
}

module.exports = check;