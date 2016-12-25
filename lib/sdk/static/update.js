'use strict';

/**
 * Update a resource.
 *
 * @param {string}
 * @param {object}
 * @param {object}
 * @param {object}
 * @return {Promise}
 */
function update (id, updates, options, context = {}) {
  updates = updates || {};

  return context.request.put({
    uri: context.uri,
    body: updates
  });
}

module.exports = update;
