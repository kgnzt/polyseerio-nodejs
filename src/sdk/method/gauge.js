'use strict';

const gaugeStatic           = require('../static/gauge'),
      { instanceToContext } = require('../helper');

/**
 * Send gauge metrics to an instance.
 *
 * @param {Resource} 
 * @param {object} 
 * @param {object}
 * @return {Promise}
 */
function gauge (instance, gauges, options) {
  return gaugeStatic(
    instance.get('id'),
    gauges,
    options,
    instanceToContext(instance)
  );
}

module.exports = gauge;
