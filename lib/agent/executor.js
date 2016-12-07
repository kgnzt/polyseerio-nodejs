'use strict';

const lodash               = require('lodash'),
      co                   = require('co'),
      DefaultConfig        = require('./default_config'),
      Handler              = require('./handler'),
      logger               = require('../logger'),
      { filterEnabledHandlers,
        resolveName,
        setupWithHandler } = require('./helper');

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
    logger.log('debug', `Starting executor agent for client: ${client._cid}`);

    if (config.attach) {
      const name = resolveName(config);

      logger.log('debug', 'Attaching process to instance.', { 
        name,
        strategy: config.attach_strategy
      });

      const instance = yield client.Instance.attach(name, {
        description: config.description,
        strategy: config.attach_strategy
      }).then(lodash.identity, error => {
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
      //yield setup('expectation', config.expectation, client, instance);

      const id = instance.heartbeat();

      return instance;
    }
  }).catch(console.log);
}

module.exports = {
  execute
};
