'use strict';

var triggerStatic = require('../static/trigger');

/**
 * Trigger an instance.
 *
 * @param {Resource}
 * @param {object}
 * @return {Promise}
 */
function trigger(instance, payload, options) {
  return triggerStatic(instance._request, instance.resource, instance.copts, instance.id, payload, options);
}

module.exports = trigger;