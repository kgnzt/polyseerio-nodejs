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

function update(id, updates, options) {
  var context = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  updates = updates || {};

  return context.request.put({
    uri: context.uri,
    body: updates
  });
}

module.exports = update;