'use strict';

const lodash                 = require('lodash'),
      { createOptions }      = require('../helper'),
      { parseResponse }      = require('../resource/helper'),
      { getResourcePath }    = require('../url_builder');

/**
 * Reduce options passed to method with client options and
 * method defaults.
 *
 * @param {object} options passed by client to SDK method
 * @param {object} options passed by client to SDK client
 * @param {object} default options for SDK method
 * @return {object}
 */
function reduceOptions (options, clientOptions, defaults = {}) {
  options = Object.assign({}, options, defaults);

  clientOptions = lodash.pick(clientOptions, [
    'environment',
    'deduce',
    'env'
  ]);

  return Object.assign({}, options, clientOptions);
}

/**
 * Attempt to resolve the current environment EID from the
 * options.
 *
 * @param {object}
 * @return {object}
 */
function resolveEid (options) {
  if ('environment' in options) {
    return options.environment;
  }

  if (options.deduce) {
    const env = options.env;

    if (!(env in process.env)) {
      throw new Error(`Could not find a value for environment variable: ${env}`);
    }

    return process.env[env];
  }

  return 'development';
}

module.exports = {
  resolveEid,
  getResourcePath,
  createOptions,
  reduceOptions
};
