'use strict';

const lodash              = require('lodash'),
      { DEFAULT_HEARTBEAT_DELAY } = require('../../constant'),
      { formatPayload,
        loopPromise }     = require('../../helper'),
      { getResourcePath } = require('../helper');

function resolveGauges (gauges) {
  const result = {};

  gauges.forEach((resolver, key) => {
    result[key] = resolver();
  });

  return result;
}

/**
 * Default heartbeat options.
 */
const DEFAULT_OPTIONS = {
  delay: DEFAULT_HEARTBEAT_DELAY
};

/**
 * Start a heartbeat loop..
 *
 * @param {string} 
 * @param {function}
 * @return {Promise}
 */
function heartbeat (options) {
  /*jshint validthis:true */
  const uri = getResourcePath(this.resource, { eid: this.eid });

  options = lodash.defaults(DEFAULT_OPTIONS, options);

  const loop = () => {
    /*jshint validthis:true */
    const gauges = resolveGauges(this._heartbeatGauges);

    const body = {
      metrics: { gauges }
    };

    return this._request.post({ 
      uri: `${uri}/${this.id}/heartbeat`,
      body
    });
  }

  return loopPromise(loop, { delay: options.delay });
}

module.exports = heartbeat;
