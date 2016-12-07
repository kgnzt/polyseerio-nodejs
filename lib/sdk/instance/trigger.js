'use strict';

const triggerStatic = require('../static/trigger');

/**
 * Trigger an instance.
 *
 * @param {Resource}
 * @param {object}
 * @return {Promise}
 */
function trigger (instance, payload, options) {
  return triggerStatic(instance.id, payload, options);
}

module.exports = trigger;
