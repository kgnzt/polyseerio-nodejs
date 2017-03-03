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
function check (options, context = {}) {
  return context.request.get({
    uri: `${context.uri}/check`
  });
}

module.exports = check;
