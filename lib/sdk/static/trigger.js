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
function trigger (id, meta, options, context = {}) {
  meta = meta || {};

  return context.request.post({
    uri: `${context.uri}/trigger`,
    body: { meta }
  });
}

module.exports = trigger;
