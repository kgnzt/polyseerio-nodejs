'use strict';

/**
 * Retreive a singleton resource.
 *
 * @param {object}
 * @param {object}
 * @return {Promise}
 */

function retreive(options) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return context.request.get({ uri: context.uri });
}

module.exports = retreive;