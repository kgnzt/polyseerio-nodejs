'use strict';

const lodash                  = require('lodash'),
      { DEFAULT_ENVIRONMENT } = require('../constant'),
      { createOptions }       = require('../helper'),
      { parseResponse }       = require('../resource/helper'),
      { getResourcePath }     = require('../url_builder');

/**
 * Removes non callable items from a map.
 *
 * @param {Map}
 * @return {Map}
 */
function removeNonResolvingValues (map) {
  const newMap = new Map();

  map.forEach((value, key, map) => {
    if (lodash.isFunction(value)) {
      newMap.set(key, value);
    }
  });

  return newMap;
}

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
  return Object.assign({}, defaults, clientOptions, options);
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

  return DEFAULT_ENVIRONMENT;
}

module.exports = {
  resolveEid,
  getResourcePath,
  removeNonResolvingValues,
  createOptions,
  reduceOptions
};
