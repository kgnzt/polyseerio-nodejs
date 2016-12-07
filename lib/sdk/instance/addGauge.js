'use strict';

const lodash = require('lodash');

/**
 * Add a gauge to the instance that will be sent with each heartbeat.
 *
 * @param {Resource}
 * @param {string}
 * @param {function}
 * @return {Promise}
 */
function addGauge (instance, key, resolver) {
  if (!lodash.has(instance, '_heartbeatGauges')) {
    instance._heartbeatGauges = new Map();
  }

  instance._heartbeatGauges.set(key, resolver);

  return global.Promise.resolve();
}

module.exports = addGauge;
