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
function gauge (id, gauges, options, context = {}) {
  gauges = gauges || {};

  return context.request.post({
    uri: `${context.uri}/gauges`,
    body: gauges
  });
}

module.exports = gauge;
