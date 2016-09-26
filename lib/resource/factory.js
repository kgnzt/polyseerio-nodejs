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
  return function (attributes = {}, options = {}) {
      Object.assign(this, lodash.omit(attributes, RESERVED));

      this.resource = resource;
      this.isNew = true;
      this.eid = attributes.eid || null;

      this._attributes = attributes;
  };
}

/**
 * Add a static method to a Resource.
 *
 * @param {function}
 * @param {function}
 * @param {string}
 * @return {object}
 */
function addStatic (Resource, method, name) {
  Resource[name] = method;

  return Resource;
}

/**
 * Add an instance method to a Resource.
 *
 * @param {function}
 * @param {function}
 * @param {string}
 * @return {object}
 */
function addMethod (Resource, method, name) {
  Resource.prototype[name] = method;

  return Resource;
}

/**
 * Add a collection of static methods to a Resource.
 *
 * @param {function}
 * @param {array[object]}
 * @return {object}
 */
function addStatics (Resource, statics = []) {
  return lodash.reduce(statics, addStatic, Resource);
}

/**
 * Add a collection of instance methods to a Resource.
 *
 * @param {function}
 * @param {request}
 * @param {array[object]}
 * @return {object}
 */
function addMethods (Resource, request, methods = []) {
  if (lodash.isEmpty(methods)) {
    return Resource;
  }

  Resource.prototype._request = request;

  return lodash.reduce(methods, addMethod, Resource);
}

/**
 * Get a factory memoize key.
 *
 * @param {string}
 * @param {_}
 * @param {_}
 * @param {number}
 * @return {string}
 */
function getMemoizeKey (resource, _, __, cid) {
  return `${resource}.${cid}`;
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

  const { statics, instance } = Definition[resource];

  const Resource = definesSingleton(Definition[resource]) ? {} : createResource(resource);

  const functions = staticFactory(request, resource, statics, options),
        methods = instanceFactory(request, resource, instance, options);

  addStatics(Resource, functions);
  addMethods(Resource, request, methods);

  return Resource;
}

const factory = lodash.memoize(_factory, getMemoizeKey);

const factoryExports = {
  addMethod,
  addStatic,
  addMethods,
  addStatics,
  getMemoizeKey,
  createResource,
  definesSingleton
};

Object.assign(factory, factoryExports);

module.exports = factory;
