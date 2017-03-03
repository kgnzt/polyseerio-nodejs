'use strict';

var lodash = require('lodash'),
    logger = require('../../logger'),
    _require = require('../../constant'),
    DEFAULT_HEARTBEAT_DELAY = _require.DEFAULT_HEARTBEAT_DELAY,
    _require2 = require('../../helper'),
    formatPayload = _require2.formatPayload,
    loopPromise = _require2.loopPromise,
    _require3 = require('../helper'),
    removeNonResolvingValues = _require3.removeNonResolvingValues,
    getResourcePath = _require3.getResourcePath;

/**
 * Resolves facts in a map.
 *
 * @param {Map}
 */
function resolveFacts(facts) {
  var result = {};

  facts.forEach(function (resolver, key) {
    var value = null;

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
function resolveGauges(gauges) {
  var result = {};

  gauges.forEach(function (resolver, key) {
    result[key] = resolver();
  });

  return result;
}

/**
 * Default attach options.
 */
var DEFAULT_OPTIONS = {
  delay: DEFAULT_HEARTBEAT_DELAY
};

/**
 * Start a heartbeat for an instance.
 *
 * @param {instance} 
 * @param {object}
 * @return {Promise}
 */
function attach(instance, options) {
  options = lodash.defaults(DEFAULT_OPTIONS, options);

  var uri = getResourcePath(instance.resource, { eid: instance.eid, id: instance.get('id') });

  var loop = function loop() {
    logger.log('debug', 'Heartbeat.');

    var body = {};

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
      uri: uri + '/heartbeat',
      body: body
    });
  };

  var loopId = loopPromise(loop, { delay: options.delay });

  instance._loopId = loopId;

  return global.Promise.resolve(loopId);
}

module.exports = attach;