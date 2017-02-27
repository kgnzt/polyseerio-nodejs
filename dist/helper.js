'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs'),
    path = require('path'),
    lodash = require('lodash'),
    inflection = require('inflection'),
    _require = require('./constant'),
    DEFAULT_ENVIRONMENT = _require.DEFAULT_ENVIRONMENT;


var DEFAULT_LOOP_PROMISE_OPTIONS = {
  delay: 1000
};

/**
 * Converts a resource (URL section) to resource type.
 *
 * @param {string}
 * @return {string}
 */
function resourceToType(resource) {
  return inflection.singularize(resource);
}

/**
 * Used in instance methods to forward context to function as the 
 * first argument.
 *
 * @param {function}
 * @return {function}
 */
function forwardThis(func) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    /*jshint validthis:true */
    return func.apply(undefined, [this].concat(args));
  };
}

/**
 * Clear a promise loop.
 *
 * @param {number}
 */
function clearLoop(loopId) {
  if (!lodash.isNumber(loopId)) {
    throw new Error('clearLoop expects a number to be passed, got: ' + loopId + '.');
  }

  var loop = loopPromise.map.get(loopId);

  if (loop.tid) {
    clearTimeout(loop.tid);
  }

  return global.Promise.resolve();
}

/**
 * Used for each loop created by the loopPromise.
 */

var LoopObject = function LoopObject(id) {
  _classCallCheck(this, LoopObject);

  this.id = id;
  this.clear = false;
  this.loop = null;
  this.resolve = null;
  this.reject = null;
};

/**
 * Loop a promise returning function.
 *
 * @param {promise}
 * @return {number}
 */


function loopPromise(promise) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  options = Object.assign({}, DEFAULT_LOOP_PROMISE_OPTIONS, options);

  var _options = options,
      delay = _options.delay;


  loopPromise._id = loopPromise._id++ || 0;

  var loopObject = new LoopObject(loopPromise._id);
  loopPromise.map.set(loopObject.id, loopObject);

  /**
   * Returns a delayed promise if the the delay has not yet been met.
   *
   * @param {number}
   * @param {number}
   * @param {Mixed}
   */
  function delayLoop(start, delay, result) {
    var remaining = delay - (Date.now() - start),
        amount = remaining > 0 ? remaining : 0;

    return delayPromise(amount, loopObject, result);
  }

  /**
   * Takes a start time and a delay amount, returns a higher order
   * function that will pass the result of a promise through but first
   * delay the resolution by the remaining delay if it exists.
   *
   * @param {number}
   * @param {number}
   */
  function delayIdentity(start, delay) {
    return function (result) {
      return delayLoop(start, delay, result);
    };
  }

  function loop(local) {
    var start = Date.now();

    return promise().then(delayIdentity(start, delay)).catch(delayIdentity(start, delay)).then(function (result) {
      if (loopObject.clear) {
        loopPromise.map.delete(loopObject.id);

        return global.Promise.reject();
      }

      return result;
    }).then(loop);
  }

  loop(promise);

  return loopObject.id;
}

loopPromise.map = new Map();

/**
 * Delay a promise by some amount.
 *
 * @param {number}
 * @param {Mixed}
 * @return {function}
 */
function delayPromise(amount, loopObject, result) {
  return new global.Promise(function (resolve, reject) {
    loopObject.tid = setTimeout(function (_) {
      return resolve(result);
    }, amount);
    loopObject.resolve = resolve;
    loopObject.reject = reject;
  });
}

/**
 * Returns default options given defaults and passed options.
 *
 * @param {object}
 * @param {object}
 * @return {object}
 */
function createOptions(options) {
  var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return Object.assign({}, defaults, options);
}

/**
 * Forward object based arguments with an override.
 *
 * @param {request} options
 * @param {string} resource type
 * @param {object} query params
 */
function forward(args, adjustments) {
  return lodash.zipWith(args, adjustments, function (left, right) {
    return Object.assign({}, left, right);
  });
}

// Default options for the wrapRequest middleware parameter.
var DEFAULT_WRAP_REQUEST_MIDDLEWARE = {
  pre: lodash.identity,
  post: lodash.identity,
  reject: function reject(error) {
    return global.Promise.reject(error);
  }
};

/**
 * Wrap a request instance with some option middleware.
 *
 * @param {request}
 * @param {function}
 * @param {function}
 * @return {object}
 */
function wrapRequest(request, middleware) {
  middleware = lodash.defaults(middleware, DEFAULT_WRAP_REQUEST_MIDDLEWARE);

  var _middleware = middleware,
      pre = _middleware.pre,
      post = _middleware.post,
      reject = _middleware.reject;


  var wrapper = function wrapper(options) {
    return request(pre(options)).then(post, reject);
  };

  ['del', 'delete', 'get', 'patch', 'post', 'put'].forEach(function (method) {
    wrapper[method] = function (options) {
      return request[method](pre(options)).then(post, reject);
    };
  });

  return wrapper;
}

/**
 * Requires an entire directory.
 *
 * @param {string}
 * @param {function}
 * @param {function}
 * @return {object}
 */
function requireDirectory(directory, predicate, iteratee) {
  var requireObjects = _getRequireObjects.apply(undefined, arguments);

  return _requireRequireObjects(requireObjects);
}

/**
 * Given an array of export objects, a reduced object is returned.
 *
 * @param {array[object]}
 * @return {object}
 */
function _requireRequireObjects(requireObjects) {
  return requireObjects.reduce(function (result, requireObject) {
    result[requireObject.name] = require(requireObject.require);

    return result;
  }, {});
}

/**
 * Creates a loadable directory object given a predicate and iteratee.
 *
 * @param {string}
 * @param {function}
 * @param {function}
 * @return {object}
 */
function _getRequireObjects(directory, predicate, iteratee) {
  return fs.readdirSync(directory).reduce(function (result, file) {
    var pathObject = path.parse(file);

    if (predicate(pathObject)) {
      result.push(iteratee(pathObject));
    }

    return result;
  }, []);
}

/**
 * Format a payload before sending.
 *
 * @param {object}
 * @return {object}
 */
function formatPayload(payload) {
  return {
    data: {
      attributes: Object.assign({}, payload)
    }
  };
}

/**
 * Remap an object based on a path mapping.
 *
 * TODO: name rekey see if there is a single liner lodash
 *
 * @param {object} the object to remap paths for
 * @param {object} the mapping of current paths
 * @return {object} the remapped object
 */
function remapObjectPaths(object) {
  var paths = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return lodash.reduce(object, function (result, value, key) {
    if (!(key in paths)) {
      result[key] = value;
    } else {
      result[paths[key]] = value;
    }

    return result;
  }, {});
}

/**
 * Create an environment mapping.
 *
 * @param {string} the environment variable that holds the current environment
 * @param {object} the environments that should be defined
 * @param {object} current process.env variables
 * @return {object} map
 * @return {object} map.current
 * @return {object} map.environments
 * @throws {Error} when no environment key exists
 */
function _createEnvironmentMap(key, environments, env) {
  if (lodash.has(env, key)) {
    var current = env[key];

    return { current: current, environments: Object.assign({}, environments) };
  } else {
    throw new Error('Could not create an environment map, no environment variable named: ' + key + ' could be found.');
  }
}

/**
 * Will attempt to resolve the API token.
 *
 * Returns undefined if one cannot be resolved.
 *
 * @param {string} token as passed by client constructor
 * @param {object} where to look in the environment for a token
 * @return {string|undefined}
 */
function resolveToken(options) {
  if (!lodash.isNil(options.token)) {
    return options.token;
  }

  if (lodash.has(process.env, options.token_env)) {
    var value = lodash.get(process.env, options.token_env);

    if (!lodash.isNil(value)) {
      return value;
    }
  }

  return null;
}

/**
 * Attempt to resolve the current environment EID from the
 * options.
 *
 * @param {object}
 * @return {object}
 */
function resolveEid(options) {
  if ('environment' in options && !lodash.isNil(options.environment)) {
    return options.environment;
  }

  if (options.deduce) {
    var env = options.env;

    if (env in process.env) {
      return process.env[env];
    }
  }

  return DEFAULT_ENVIRONMENT;
}

/**
 * Given an environment map, the current environment will be returned.
 *
 * @param {string} the environment variable that holds the current environment
 * @param {object} the environments that should be defined
 * @param {object} current process.env variables
 * @return {string} the current environment id
 */
function deduceEid(key, environments, env) {
  var map = _createEnvironmentMap(key, environments, env);

  if (lodash.has(map.environments, map.current)) {
    return map.environments[map.current];
  } else {
    throw new Error('Could not find the current environment: ' + map.current + ' in the environments passed.');
  }
}

module.exports = {
  clearLoop: clearLoop,
  createOptions: createOptions,
  deduceEid: deduceEid,
  formatPayload: formatPayload,
  forward: forward,
  forwardThis: forwardThis,
  loopPromise: loopPromise,
  remapObjectPaths: remapObjectPaths,
  requireDirectory: requireDirectory,
  resolveEid: resolveEid,
  resolveToken: resolveToken,
  resourceToType: resourceToType,
  wrapRequest: wrapRequest
};