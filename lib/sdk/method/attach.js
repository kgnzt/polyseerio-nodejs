'use strict';

const lodash                      = require('lodash'),
      logger                      = require('../../logger'),
      { DEFAULT_HEARTBEAT_DELAY } = require('../../constant'),
      { formatPayload,
        loopPromise }             = require('../../helper'),
      { removeNonResolvingValues,
        getResourcePath }         = require('../helper');

/**
 * Resolves facts in a map.
 *
 * @param {Map}
 */
function resolveFacts (facts) {
  const result = {};

  facts.forEach((resolver, key) => {
    let value = null;

    if (lodash.isFunction(resolver)) {
      value = resolver();
    } else {
      value = resolver;
    }

    result[key] = value;
  });

  return result;
}

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

  const uri = getResourcePath(instance.resource, { eid: instance.eid, id: instance.get('id') });

  const loop = () => {
    logger.log('debug', `Heartbeat.`);

    const body = {};

    if (lodash.has(instance, '_heartbeatGauges')) {
      body.metrics = {};
      body.metrics.gauges = resolveGauges(instance._heartbeatGauges);

      instance._gaugeFacts = removeNonResolvingValues(instance._heartbeatGauges);
    }

    if (lodash.has(instance, '_heartbeatFacts')) {
      body.facts = resolveFacts(instance._heartbeatFacts);

      instance._heartbeatFacts = removeNonResolvingValues(instance._heartbeatFacts);
    }

    return instance._request.post({ 
      uri: `${uri}/heartbeat`,
      body
    });
  };

  const loopId = loopPromise(loop, { delay: options.delay });

  instance._loopId = loopId;

  return global.Promise.resolve(loopId);
}

module.exports = attach;
