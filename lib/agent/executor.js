'use strict';

const lodash               = require('lodash'),
      co                   = require('co'),
      DefaultConfig        = require('./default_config'),
      Handler              = require('./handler'),
      { generateName,
        setupWithHandler } = require('./helper');

const setup = setupWithHandler(Handler);

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
      const instance = yield client.Instance.attach(generateName(), {
        description: config.description,
        strategy: config.attach_strategy
      });

      console.log('instance');
      console.log(instance);

      yield setup('process_event', config.process_event, client, instance, process);
      yield setup('process_signal', config.process_signal, client, instance, process);
      yield setup('metric', config.metric, client, instance, process);
      yield setup('event', config.event, client, instance);
      //yield setup('expectation', config.expectation, client, instance);
    }
  }).catch(console.log);
}

module.exports = {
  execute
};
