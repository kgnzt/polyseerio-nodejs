'use strict';

const lodash              = require('lodash'),
      Definition          = require('./definition'),
      { staticFactory,
        instanceFactory } = require('../sdk/factory');

/**
 * Reserved resource attribute names / paths.
 */
const RESERVED = [
  'relationships',
  'meta'
];

/**
 * Determine if a resource definition should generate a singleton.
 *
 * @param {object}
 * @return {boolean}
 */
function definesSingleton (definition) {
  return (!('instance' in definition) ||
    definition.instance.length === 0);
}

/**
 * Creates a new Resource class.
 *
 * @param {string}
 * @return {function}
 */
function createResource (resource) {
  return class {
    /**
     * @param {object}
     * @param {object}
     */
    constructor (attributes = {}, options = {}) {
      Object.assign(this, lodash.omit(attributes, RESERVED));

      this.resource = resource;
    }
  };
}

/**
 * Create a resource.
 *
 * @param {string}
 * @param {request}
 * @param {string}
 * @return {function}
 */
function _factory (resource, request, options, memoizeId) {
  if (!(resource in Definition)) {
    throw new Error(`Could not find definition for resource: ${resource}.`);
  }

  const { statics,
          instance } = Definition[resource];

  const Resource = definesSingleton(Definition[resource]) ? {} : createResource(resource);

  const functions = staticFactory(request, resource, statics, options),
        methods = instanceFactory(request, resource, instance, options);

  lodash.forEach(functions, (method, name) => Resource[name] = method);
  lodash.forEach(methods, (method, name) => Resource.prototype[name] = method);

  return Resource;
}

const factory = lodash.memoize(_factory, (resource, _, __, memoizeId) => {
  return `${resource}.${memoizeId}`;
});

factory.createResource = createResource;
factory.definesSingleton = definesSingleton;

module.exports = factory;
