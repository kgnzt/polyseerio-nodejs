'use strict';

const Client      = require('../client'),
      lodash      = require('lodash'),
      { execute } = require('./executor');

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
    return execute(this._client, ...args).
      then(instance => {
        this._instance = instance;

        return this._client;
      });
  }
}

module.exports = Agent;
