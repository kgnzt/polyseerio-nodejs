'use strict';

/**
 * Trigger a resource.
 *
 * @param {string}
 * @param {object}
 * @param {object}
 * @param {object}
 * @return {Promise}
 */

function trigger(id, meta, options) {
  var context = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  meta = meta || {};

  return context.request.post({
    uri: context.uri + '/trigger',
    body: { meta: meta }
  });
}

module.exports = trigger;