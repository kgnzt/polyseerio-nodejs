'use strict';

const lodash                   = require('lodash'),
      { Resource }             = require('./enum'),
      { DEFAULT_API_BASE_URL,
        DEFAULT_API_VERSION,
        DEFAULT_API_PROTOCOL } = require('./constant');

/**
 * Resources that are routable by environment.
 */
const RoutableResources = [
  Resource.ALERT,
  Resource.ENVIRONMENT_MESSAGE,
  Resource.EVENT,
  Resource.EXPECTATION,
  Resource.INSTANCE,
  Resource.TASK
];

/**
 * Determines if a resource is routable by environment.
 *
 * @param {string}
 * @return {boolean}
 */
function _isRoutableResource (resource) {
  return (RoutableResources.indexOf(resource) !== -1);
}

// Use memoized version.
const isRoutableResource = lodash.memoize(_isRoutableResource);

/**
 * Returns the path for a given resource.
 *
 * @param {string}
 * @param {options}
 * @return {string}
 */
function _getResourcePath (resource, options = {}) {
  let environment = '';
  if (isRoutableResource(resource)) {
    if (!lodash.has(options, 'eid')) {
      throw new TypeError(`Cannot get routable resource path for ${resource}, without passing an eid to the options.`);
    }

    // convert into a message resource
    if (resource === Resource.ENVIRONMENT_MESSAGE) {
      resource = Resource.MESSAGE;
    }

    environment = `environments/${options.eid}/`;
  }

  const id = ('id' in options && !lodash.isNil(options.id)) ? `/${options.id}` : '';

  return `/${environment}${resource}${id}`;
}

// Export memoized version.
const getResourcePath = lodash.memoize(_getResourcePath, (resource, options = {}) => {
  return `${resource}.${options.id}.${options.eid}`;
});

/**
 * Construct a usable polyseer API base url.
 *
 * @param {string} base url
 * @param {string} version
 * @return {string}
 */
function getBaseUrl (
  base     = DEFAULT_API_BASE_URL, 
  protocol = DEFAULT_API_PROTOCOL, 
  version  = DEFAULT_API_VERSION
) {
  return `${protocol}${base}/${version}`;
}

module.exports = {
  getResourcePath,
  getBaseUrl,
  RoutableResources
};
