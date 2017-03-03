'use strict';

var gaugeStatic = require('../static/gauge'),
    _require = require('../helper'),
    instanceToContext = _require.instanceToContext;

/**
 * Send gauge metrics to an instance.
 *
 * @param {Resource} 
 * @param {object} 
 * @param {object}
 * @return {Promise}
 */
function gauge(instance, gauges, options) {
  return gaugeStatic(instance.get('id'), gauges, options, instanceToContext(instance));
}

module.exports = gauge;