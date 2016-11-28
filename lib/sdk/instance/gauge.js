'use strict';

const gaugeStatic = require('../static/gauge');

/**
 * Send gauge metrics to an instance.
 *
 * @param {object} 
 * @param {object}
 * @return {Promise}
 */
function gauge (gauges, options) {
  /*jshint validthis:true */
  return gaugeStatic(this._request, this.resource, {
    environment: this.eid
  }, this.id, gauges, options);
}

module.exports = gauge;
