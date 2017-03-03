'use strict';

/**
 * Remove a resource.
 *
 * @param {string}
 * @param {object}
 * @param {object}
 * @return {Promise}
 */
function remove (id, options, context = {}) {
  return context.request.del({ uri: context.uri });
}

module.exports = remove;
