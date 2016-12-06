'use strict';

const lodash               = require('lodash'),
      co                   = require('co'),
      DefaultConfig        = require('./default_config'),
      Handler              = require('./handler'),
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
    if (config.attach) {
      const name = resolveName(config);

      const instance = yield client.Instance.attach(name, {
        description: config.description,
        strategy: config.attach_strategy
      });

      const handlers = filterEnabledHandlers(lodash.pick(config, handlerKeys));

      yield setup('process_event', handlers.process_event, client, instance, process);
      yield setup('process_signal', handlers.process_signal, client, instance, process);
      yield setup('metric', handlers.metric, client, instance, process);
      yield setup('event', handlers.event, client, instance);
      //yield setup('expectation', config.expectation, client, instance);
    }
  }).catch(console.log);
}

module.exports = {
  execute
};
