'use strict';

var lodash = require('lodash'),
    _require = require('./enum'),
    Resource = _require.Resource,
    _require2 = require('./constant'),
    DEFAULT_API_BASE_URL = _require2.DEFAULT_API_BASE_URL,
    DEFAULT_API_VERSION = _require2.DEFAULT_API_VERSION,
    DEFAULT_API_PROTOCOL = _require2.DEFAULT_API_PROTOCOL;

/**
 * Resources that are routable by environment.
 */
var RoutableResources = [Resource.ALERT, Resource.ENVIRONMENT_MESSAGE, Resource.EVENT, Resource.EXPECTATION, Resource.INSTANCE, Resource.TASK];

/**
 * Determines if a resource is routable by environment.
 *
 * @param {string}
 * @return {boolean}
 */
function _isRoutableResource(resource) {
  return RoutableResources.indexOf(resource) !== -1;
}

// Use memoized version.
var isRoutableResource = lodash.memoize(_isRoutableResource);

/**
 * Returns the path for a given resource.
 *
 * @param {string}
 * @param {options}
 * @return {string}
 */
function _getResourcePath(resource) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var environment = '';
  if (isRoutableResource(resource)) {
    if (!lodash.has(options, 'eid')) {
      throw new TypeError('Cannot get routable resource path for ' + resource + ', without passing an eid to the options.');
    }

    // convert into a message resource
    if (resource === Resource.ENVIRONMENT_MESSAGE) {
      resource = Resource.MESSAGE;
    }

    environment = 'environments/' + options.eid + '/';
  }

  var id = 'id' in options && !lodash.isNil(options.id) ? '/' + options.id : '';

  return '/' + environment + resource + id;
}

// Export memoized version.
var getResourcePath = lodash.memoize(_getResourcePath, function (resource) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return resource + '.' + options.id + '.' + options.eid;
});

/**
 * Construct a usable polyseer API base url.
 *
 * @param {string} base url
 * @param {string} version
 * @return {string}
 */
function getBaseUrl() {
  var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_API_BASE_URL;
  var protocol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_API_PROTOCOL;
  var version = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_API_VERSION;

  return '' + protocol + base + '/' + version;
}

module.exports = {
  getResourcePath: getResourcePath,
  getBaseUrl: getBaseUrl,
  RoutableResources: RoutableResources
};