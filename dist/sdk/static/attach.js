'use strict';

var _StrategyHandler;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../../helper'),
    loopPromise = _require.loopPromise,
    _require2 = require('../../enum'),
    Strategy = _require2.Strategy;

/**
 * Default attach options.
 */


var DEFAULT_OPTIONS = {
  strategy: Strategy.FALLBACK,
  delay: 3000,
  deduce: true,
  env: 'NODE_ENV'
};

// TODO: unit-test

/**
 * Attachement strategy implementation.
 */
var StrategyHandler = (_StrategyHandler = {}, _defineProperty(_StrategyHandler, Strategy.FALLBACK, function (request, resource, uri, options) {
  if (!('identifier' in options)) {
    return global.Promise.reject(new Error('Cannot attach as a ' + resource + ' using the ' + options.strategy.toString() + ' strategy without providing a name.'));
  }

  return request.get({
    uri: uri + '/name/' + options.identifier
  }).then(function (result) {
    return result;
  }, function (error) {
    if (error.statusCode === 404) {
      return request.post({
        uri: uri,
        body: { name: options.identifier }
      });
    }

    return global.Promise.reject(error);
  }).then(function (data) {
    var loop = function loop() {
      return request.post({ uri: uri + '/' + data.id + '/heartbeat' });
    },
        id = loopPromise(loop, { delay: options.delay });

    return global.Promise.resolve(Object.assign(data, {
      loopId: id
    }));
  });
}), _defineProperty(_StrategyHandler, Strategy.ID, function (request, resource, uri, options) {
  if (!('identifier' in options)) {
    return global.Promise.reject(new Error('Cannot attach as a ' + resource + ' using the ' + options.strategy.toString() + ' strategy without providing an id.'));
  }

  var loop = function loop() {
    return request.post({ uri: uri + '/' + options.identifier + '/heartbeat' });
  },
      id = loopPromise(loop, { delay: options.delay });

  return global.Promise.resolve({});
}), _StrategyHandler);

/**
 * Attach to a resource.
 *
 * @param {request}
 * @param {string}
 * @param {object}
 * @param {object}
 * @return {Promise}
 */
function attach(identifier, options) {
  var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (identifier) {
    options.identifier = identifier;
  }

  if (!(options.strategy in StrategyHandler)) {
    throw new TypeError('Do not know how to attach using the ' + options.strategy + ' strategy.');
  }

  return StrategyHandler[options.strategy](context.request, context.resource, context.uri, options);
}

attach.Strategy = Strategy;

module.exports = attach;