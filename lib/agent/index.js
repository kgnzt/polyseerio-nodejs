'use strict';

const Client       = require('../client'),
      DefaultConfig        = require('./default_config'),
      lodash       = require('lodash'),
      HandlerMap           = require('./handler'),
      { filterHandlers } = require('./helper'),
      { setup,
        teardown } = require('./executor');

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

    return setup(this._client, options).
      then(instance => {
        this._instance = instance; // TODO: is this the right place for this?

        return this._client;
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
