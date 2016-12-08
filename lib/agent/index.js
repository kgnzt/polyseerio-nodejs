'use strict';

const Client       = require('../client'),
      lodash       = require('lodash'),
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
  }

  /**
   * Start the agent.
   *
   * @return {Promise}
   */
  start (...args) {
    return setup(this._client, ...args).
      then(instance => {
        this._instance = instance;

        return this._client;
      });
  }

  /**
   * Gracefully stop the agent.
   *
   * @return {Promise}
   */
  stop () {
    return teardown(this._client, this._instance).
      then(_ => {
        return this._client;
      });
  }
}

module.exports = Agent;
