'use strict';

const lodash                      = require('lodash'),
      { DEFAULT_HEARTBEAT_DELAY } = require('../../constant'),
      { formatPayload,
        loopPromise }             = require('../../helper'),
      { getResourcePath }         = require('../helper');

/**
 * Resolves gauges in a map.
 *
 * @param {Map}
 */
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
 * Start a heartbeat for an instance.
 *
 * @param {instance} 
 * @param {object}
 * @return {Promise}
 */
function heartbeat (instance, options) {
  options = lodash.defaults(DEFAULT_OPTIONS, options);

  const uri = getResourcePath(instance.resource, { eid: instance.eid });

  const loop = () => {
    const gauges = resolveGauges(instance._heartbeatGauges),
          body = { metrics: { gauges } };

    return instance._request.post({ 
      uri: `${uri}/${instance.id}/heartbeat`,
      body
    });
  };

  return loopPromise(loop, { delay: options.delay });
}

module.exports = heartbeat;
