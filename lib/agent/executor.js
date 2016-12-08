'use strict';

const lodash               = require('lodash'),
      co                   = require('co'),
      DefaultConfig        = require('./default_config'),
      Handler              = require('./handler'),
      logger               = require('../logger'),
      { filterEnabledHandlers,
        resolveName,
        teardownWithHandler,
        setupWithHandler } = require('./helper');

const tear = teardownWithHandler(Handler);

const setup = setupWithHandler(Handler),
      handlerKeys = lodash.keys(Handler);

/**
 * Given a client and a config, the config will be fulfilled.
 *
 * @param {Client}
 * @param {object}
 */
function execute (client, config) {
  config = lodash.defaultsDeep({}, DefaultConfig, config);

  return co(function* () {
    logger.log('debug', `Setting up agent for client: ${client._cid}.`);

    if (config.attach) {
      const name = resolveName(config);

      logger.log('debug', 'Attaching process to instance.', { 
        name,
        strategy: config.attach_strategy
      });

      // add instance to agent....

      const instance = yield client.Instance.findByName(name).
        then(lodash.identity, error => {
          if (error.statusCode === 404) {
            return client.Instance.create({ name });
          }
        });

      let handlers = lodash.pick(config, handlerKeys);

      handlers = lodash.reduce(handlers, (acc, config, key) => {
        acc[key] = filterEnabledHandlers(config);
        return acc;
      }, {});

      yield setup('process_event', handlers.process_event, client, instance, process);
      yield setup('process_signal', handlers.process_signal, client, instance, process);
      yield setup('metric', handlers.metric, client, instance, process);
      yield setup('event', handlers.event, client, instance);
      // IT IS REQUIRED TO ATTACH A PROCESS SIGTERM to handle teardown...
      //yield setup('expectation', config.expectation, client, instance);

      instance.attach(); // promise? yield? pretty sure

      return instance;
    }
  }).catch(console.log); // use winsont logger error for log error
}

function teardown (client, instance) {
  return co(function* () {
    logger.log('debug', `Tearing down agent for client: ${client._cid}.`);

    yield tear('event', {
      stop: true
    }, client, instance, process);

    return instance.detach(_ => {
      logger.log('debug', `beating stopped`);
      return _;
    });
  }).catch(console.log);
}

module.exports = {
  execute,
  teardown
};
