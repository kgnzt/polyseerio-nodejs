'use strict';

const lodash               = require('lodash'),
      co                   = require('co'),
      DefaultConfig        = require('./default_config'),
      HandlerMap           = require('./handler'),
      logger               = require('../logger'),
      { upsert }           = require('../resource/routine'),
      { filterEnabledHandlers,
        filterHandlers,
        resolveName,
        teardownWithHandler,
        setupWithHandler } = require('./helper');

const teardownHandler = teardownWithHandler(HandlerMap);

/**
 * Fulfills an agent configuration.
 *
 * @param {Client}
 * @param {object}
 * @return {Promise}
 */
function setup (client, options) {
  options = lodash.defaultsDeep({}, DefaultConfig, options);

  return co(function* () {
    logger.log('debug', `Setting up agent for client: ${client._cid}.`);

    if (options.attach) {
      const name = resolveName(options);

      logger.log('debug', 'Attaching process to instance.', { 
        name,
        strategy: options.attach_strategy
      });

      // perform an instance upsert.
      const instance = yield upsert(client.Instance, { name });

      client.instance = instance;

      // extract enabled handler options.
      const handlerOptions = filterHandlers(
        lodash.pick(options, lodash.keys(HandlerMap))
      );

      // create a setup handler.
      const setupHandler = setupWithHandler(HandlerMap, client, handlerOptions);

      // gather and perform work.
      const setups = lodash.map(handlerOptions, (_, key) => setupHandler(key));
      yield global.Promise.all(setups);

      // start monitoring.
      yield instance.attach();

      return instance;
    }
  }).catch(console.log); // use winsont logger error for log error
}

/**
 * Tearsdown an client's agent.
 *
 * @param {Client}
 * @param {object}
 * @return {Promise}
 */
function teardown (client, instance) {
  return co(function* () {
    logger.log('debug', `Tearing down agent for client: ${client._cid}.`);

    yield teardownHandler('event', {
      stop: true
    }, client, instance, process);

    return instance.detach(_ => {
      logger.log('debug', `beating stopped`);
      return _;
    });
  }).catch(console.log);
}

module.exports = {
  setup,
  teardown
};
