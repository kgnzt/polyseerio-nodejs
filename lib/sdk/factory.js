'use strict';

const Static   = require('./static'),
      Instance = require('./instance');

/**
 * Create a static function for a given resource.
 *
 * @param {request} options
 * @param {string} resource type
 * @param {object} query params
 */
function staticFactory (request, resource, statics = [], options = {}) {
  return statics.reduce((result, method) => {
    if (!(method in Static)) {
      throw new Error(`SDK factory was asked to generate a '${method}' static method; however, a method of that name has not been defined.`);
    }

    result[method] = Static[method](request, resource, options);

    return result;
  }, {});
}

/**
 * Create an instance function for a given resource.
 *
 * @param {request} options
 * @param {string} resource type
 * @param {object} query params
 */
function instanceFactory (request, resource, statics = [], options = {}) {
  return statics.reduce((result, method) => {
    if (!(method in Instance)) {
      throw new Error(`SDK factory was asked to generate a '${method}' instance method; however, a method of that name has not been defined.`);
    }

    result[method] = Instance[method];

    return result;
  }, {});
}

module.exports = {
  staticFactory,
  instanceFactory
};
