'use strict';

const lodash = require('lodash');

/**
 * Add a gauge to the instance that will be sent with each heartbeat.
 *
 * @param {string} 
 * @param {function}
 * @return {Promise}
 */
function addGauge (key, resolver) {
  if (!lodash.has(this, '_heartbeatGauges')) {
    this._heartbeatGauges = new Map();
  }

  this._heartbeatGauges.set(key, resolver);
}

module.exports = addGauge;
