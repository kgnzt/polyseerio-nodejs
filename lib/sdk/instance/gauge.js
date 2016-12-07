'use strict';

const gaugeStatic = require('../static/gauge');

/**
 * Send gauge metrics to an instance.
 *
 * @param {Resource} 
 * @param {object} 
 * @param {object}
 * @return {Promise}
 */
function gauge (instance, gauges, options) {
  return gaugeStatic(instance._request, instance.resource, {
    environment: instance.eid
  }, instance.id, gauges, options);
}

module.exports = gauge;
