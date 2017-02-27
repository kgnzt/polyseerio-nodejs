'use strict';

var lodash = require('lodash'),
    Static = require('./static'),
    Method = require('./method'),
    _require = require('../url_builder'),
    getResourcePath = _require.getResourcePath,
    _require2 = require('lodash'),
    curry = _require2.curry,
    _require3 = require('./helper'),
    reduceOptions = _require3.reduceOptions;


var STATIC_ARITY = 4;

var ID_REGEX = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

function isId(id) {
  return lodash.isNumber(id) || ID_REGEX.test(id);
}

/**
 */
function preProcessMethodCall(instance, copts, method) {}

/**
 * Preprocesses a static call.
 *
 * @param {Request}
 * @param {string}
 * @param {object}
 * @param {function}
 * @return {function}
 */
function preprocessStaticCall(request, resource, copts, method) {
  return function () {
    var callOptions = {};

    // we have call site overrides.

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length === method.length) {
      callOptions = args.pop();
    }

    var options = reduceOptions(callOptions, copts);

    var id = null;
    if (isId(lodash.first(args))) {
      id = lodash.first(args);
    }

    var uri = getResourcePath(resource, {
      eid: options.environment, id: id
    });

    var context = {
      resource: resource,
      request: request,
      uri: uri
    };

    return method.apply(undefined, args.concat([options, context]));
  };
}

/**
 * Create a static function for a given resource.
 *
 * @param {request} options
 * @param {string} resource type
 * @param {object} query params
 */
function staticFactory(request, resource) {
  var statics = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  return statics.reduce(function (result, method) {
    if (!(method in Static)) {
      throw new Error('SDK factory was asked to generate a \'' + method + '\' static method; however, a method of that name has not been defined.');
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
function methodFactory(request, resource) {
  var statics = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  return statics.reduce(function (result, method) {
    if (!(method in Method)) {
      throw new Error('SDK factory was asked to generate a \'' + method + '\' instance method; however, a method of that name has not been defined.');
    }

    result[method] = Method[method];

    return result;
  }, {});
}

module.exports = {
  staticFactory: staticFactory,
  methodFactory: methodFactory
};