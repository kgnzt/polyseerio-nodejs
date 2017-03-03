'use strict';

/**
 * Retreive a singleton resource.
 *
 * @param {object}
 * @param {object}
 * @return {Promise}
 */
function retreive (options, context = {}) {
  return context.request.get({ uri: context.uri });
}

module.exports = retreive;
