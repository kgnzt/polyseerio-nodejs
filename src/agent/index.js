'use strict';

const Client             = require('../client'),
      DefaultConfig      = require('./default_config'),
      lodash             = require('lodash'),
      HandlerMap         = require('./handler'),
      logger             = require('../logger'),
      { logAndReject }   = logger,
      { clearLoop,
        loopPromise }    = require('../helper'),
      { filterHandlers } = require('./helper'),
      { setup,
        teardown }       = require('./executor');

/**
 * The Polyseer.io agent.
 */
class Agent {
  /**
   * @param {Client}
   */
  constructor (client) {
    if (lodash.isNil(Client) || !lodash.isObject(client)) {
      throw new TypeError('Must pass a Polyseer.io client to Agent.');
    }

    this._client = client;
    this._instance = null;
    this._start_args = null;
  }

  /**
   * Start the agent.
   *
   * @param {object}
   * @return {Promise}
   */
  start (options) {
    options = lodash.defaultsDeep({}, options,  DefaultConfig);

    const handlerOptions = filterHandlers(
      lodash.pick(options, lodash.keys(HandlerMap))
    );

    options.handlers = handlerOptions;
    this._handler_options = handlerOptions;

    return new global.Promise((resolve, reject) => {
      let attempt = 0;

      const loop = loopPromise(() => {
        const meta = {
          attempt: attempt += 1
        };

        logger.log('info', 'Agent setup attempt.', meta);
  
        return setup(this._client, options).
          then(instance => {
            logger.log('info', 'Agent setup success.', meta);
            this._instance = instance; // TODO: is this the right place for this?
  
            clearLoop(loop);
  
            return resolve(this._client);
          }).catch(error => {
            logger.log('error', `Agent setup failed. Will retry in ${options.agent_retry} ms.`, meta);

            return logAndReject(error);
          });
      }, {
        delay: options.agent_retry
      });
    });
  }

  /**
   * Gracefully stop the agent.
   *
   * @return {Promise}
   */
  stop () {
    return teardown(this._client, this._handler_options).
      then(_ => {
        return this._client;
      });
  }
}

module.exports = Agent;
