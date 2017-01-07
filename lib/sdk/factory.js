'use strict';

const lodash              = require('lodash'),
      Static              = require('./static'),
      Method              = require('./method'),
      { getResourcePath } = require('../url_builder'),
      { curry }           = require('lodash'),
      { reduceOptions }   = require('./helper');

const STATIC_ARITY = 4;

const ID_REGEX = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

function isId (id) {
  return (lodash.isNumber(id) || ID_REGEX.test(id));
}

/**
 */
function preProcessMethodCall (instance, copts, method) {
}

/**
 * Preprocesses a static call.
 *
 * @param {Request}
 * @param {string}
 * @param {object}
 * @param {function}
 * @return {function}
 */
function preprocessStaticCall (request, resource, copts, method) {
  return function (...args) {
    let callOptions = {};

    // we have call site overrides.
    if (args.length === method.length) {
      callOptions = args.pop();
    }
  
    const options = reduceOptions(callOptions, copts);

    let id = null;
    if (isId(lodash.first(args))) {
      id = lodash.first(args);
    }

    const uri = getResourcePath(resource, { 
      eid: options.environment, id 
    });

    const context = {
      resource,
      request,
      uri
    };
  
    return method(...args, options, context);
  };
}

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

    result[method] = preprocessStaticCall(request, resource, options, Static[method]);

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
function methodFactory (request, resource, statics = [], options = {}) {
  return statics.reduce((result, method) => {
    if (!(method in Method)) {
      throw new Error(`SDK factory was asked to generate a '${method}' instance method; however, a method of that name has not been defined.`);
    }

    result[method] = Method[method];

    return result;
  }, {});
}

module.exports = {
  staticFactory,
  methodFactory
};
