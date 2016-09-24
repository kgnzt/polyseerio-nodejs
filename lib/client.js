'use strict';

const lodash = require('lodash');

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
 * The polyseer.io client.
 */
class Client {
  /**
   * @param {object} options
   * @param {object} options.request
   */
  constructor (options = {}) {
    options = Object.assign({}, DEFAULT_OPTIONS, options);

    if (options.request === null) {
      throw new TypeError(`Cannot create an instance of Client without passing an instance of request to the options.`);
    }

    Object.assign(this, lodash.omit(options.resources));

    this._request = options.request;
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
