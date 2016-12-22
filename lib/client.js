'use strict';

const lodash = require('lodash'),
      Enum   = require('./enum'),
      Agent  = require('./agent');

/**
 * Reserved resource attribute names / paths.
 */
const RESERVED = [
  '_request'
];

/**
 * Default client options.
 */
const DEFAULT_OPTIONS = {
  request: null,
  resources: {}
};

/**
 * The Polyseer.io client.
 */
class Client {
  /**
   * @param {object} options
   * @param {object} options.request
   */
  constructor (cid, options = {}) {
    options = Object.assign({}, DEFAULT_OPTIONS, options);

    if (lodash.isNil(cid)) {
      throw new TypeError('Cannot create a Client instance without passing a unique client id (cid).');
    }

    if (options.request === null) {
      throw new TypeError(`Cannot create an instance of Client without passing an instance of request to the options.`);
    }

    Object.assign(this, lodash.omit(options.resources));

    this._cid = cid;
    this._request = options.request;
    this._agent = null;
    this.instance = null; // TODO: unit-test add getter and setter (consider attaching to agent?)
    Object.assign(this, Enum);
  }

  /**
   * Start the agent.
   *
   * @param {...}
   * @return {Promise}
   */
  startAgent (...args) {
    if (!lodash.isNull(this._agent)) {
      return global.Promise.reject(new Error('Agent has already been started for this client.'));
    }

    this._agent = new Agent(this);

    return this._agent.start(...args);
  }

  /**
   * Return the currently deduced environment.
   */
  getCurrentEnvironment () {
    const { Environment } = this;

    return Environment.findByName();
  }
}

module.exports = Client;
