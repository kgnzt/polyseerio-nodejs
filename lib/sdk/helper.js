'use strict';

const lodash                  = require('lodash'),
      { DEFAULT_ENVIRONMENT } = require('../constant'),
      { createOptions }       = require('../helper'),
      { parseResponse }       = require('../resource/helper'),
      { getResourcePath }     = require('../url_builder');

/**
 * TODO: unit-test
 */
function instanceToContext (instance) {
  const uri = getResourcePath(instance.resource, { 
    eid: instance.eid, id: instance.get('id')
  });

  return {
    environment: instance.eid,
    request: instance._request,
    uri
  };
}

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

module.exports = {
  getResourcePath,
  removeNonResolvingValues,
  createOptions,
  instanceToContext,
  reduceOptions
};
