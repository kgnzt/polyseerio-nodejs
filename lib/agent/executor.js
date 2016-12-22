'use strict';

const lodash               = require('lodash'),
      co                   = require('co'),
      DefaultConfig        = require('./default_config'),
      HandlerMap           = require('./handler'),
      logger               = require('../logger'),
      { logAndReject }     = logger,
      { upsert }           = require('../resource/routine'),
      { filterHandlers,
        resolveName,
        teardownWithHandler,
        setupWithHandler } = require('./helper');

/**
 * Fulfills an agent configuration.
 *
 * @param {Client}
 * @param {object}
 * @return {Promise}
 */
function setup (client, options) {
  return co(function* () {
    logger.log('debug', `Setting up agent for client: ${client._cid}.`);

    if (options.attach) {
      const name = resolveName(options);

      logger.log('debug', 'Attempting to upsert instance.', { name });

      // perform an instance upsert.
      const instance = yield upsert(client.Instance, { name });

      client.instance = instance;

      // create a setup handler.
      const setupHandler = setupWithHandler(HandlerMap, client, options.handlers);

      // gather and perform work.
      const setups = lodash.map(options.handlers, (_, key) => setupHandler(key));
      yield global.Promise.all(setups);

      logger.log('debug', 'Attempting to attach instance to polyseerio.', { 
        name,
        strategy: options.attach_strategy
      });

      // start monitoring.
      yield instance.attach();

      return instance;
    }
  }).catch(logAndReject);
}

/**
 * Tearsdown an client's agent.
 *
 * @param {Client}
 * @return {Promise}
 */
function teardown (client, handlerOptions) {
  return co(function* () {
    logger.log('debug', `Tearing down agent for client: ${client._cid}.`);

    const teardownHandler = teardownWithHandler(HandlerMap, client, handlerOptions);

    // gather and perform work.
    const teardowns = lodash.map(handlerOptions, (_, key) => teardownHandler(key));
    yield global.Promise.all(teardowns);

    yield client.instance.detach();

    return client;
  }).catch(logAndReject);
}

module.exports = {
  setup,
  teardown
};
