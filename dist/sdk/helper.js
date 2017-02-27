'use strict';

var lodash = require('lodash'),
    _require = require('../constant'),
    DEFAULT_ENVIRONMENT = _require.DEFAULT_ENVIRONMENT,
    _require2 = require('../helper'),
    createOptions = _require2.createOptions,
    _require3 = require('../resource/helper'),
    parseResponse = _require3.parseResponse,
    _require4 = require('../url_builder'),
    getResourcePath = _require4.getResourcePath;

/**
 * TODO: unit-test
 */
function instanceToContext(instance) {
  var uri = getResourcePath(instance.resource, {
    eid: instance.eid, id: instance.get('id')
  });

  return {
    environment: instance.eid,
    request: instance._request,
    uri: uri
  };
}

/**
 * Removes non callable items from a map.
 *
 * @param {Map}
 * @return {Map}
 */
function removeNonResolvingValues(map) {
  var newMap = new Map();

  map.forEach(function (value, key, map) {
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
function reduceOptions(options, clientOptions) {
  var defaults = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return Object.assign({}, defaults, clientOptions, options);
}

module.exports = {
  getResourcePath: getResourcePath,
  removeNonResolvingValues: removeNonResolvingValues,
  createOptions: createOptions,
  instanceToContext: instanceToContext,
  reduceOptions: reduceOptions
};