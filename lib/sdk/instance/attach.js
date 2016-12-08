'use strict';

const lodash                      = require('lodash'),
      logger                      = require('../../logger'),
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
 * Default attach options.
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
function attach (instance, options) {
  options = lodash.defaults(DEFAULT_OPTIONS, options);

  const uri = getResourcePath(instance.resource, { eid: instance.eid });

  const loop = () => {
    logger.log('debug', `Heartbeat.`);

    const gauges = resolveGauges(instance._heartbeatGauges),
          body = { metrics: { gauges } };

    return instance._request.post({ 
      uri: `${uri}/${instance.id}/heartbeat`,
      body
    });
  };

  const loopId = loopPromise(loop, { delay: options.delay });

  instance._loopId = loopId;

  return global.Promise.resolve(loopId);
}

module.exports = attach;
