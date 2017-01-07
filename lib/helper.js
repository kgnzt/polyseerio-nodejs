'use strict';

const fs                      = require('fs'),
      path                    = require('path'),
      lodash                  = require('lodash'),
      inflection              = require('inflection'),
      { DEFAULT_ENVIRONMENT } = require('./constant');

const DEFAULT_LOOP_PROMISE_OPTIONS = {
  delay: 1000
};

/**
 * Converts a resource (URL section) to resource type.
 *
 * @param {string}
 * @return {string}
 */
function resourceToType (resource) {
  return inflection.singularize(resource);
}

/**
 * Used in instance methods to forward context to function as the 
 * first argument.
 *
 * @param {function}
 * @return {function}
 */
function forwardThis (func) {
  return function (...args) {
    /*jshint validthis:true */
    return func(this, ...args);
  };
}

/**
 * Clear a promise loop.
 *
 * @param {number}
 */
function clearLoop (loopId) {
  if (!lodash.isNumber(loopId)) {
    throw new Error(`clearLoop expects a number to be passed, got: ${loopId}.`);
  }

  const loop = loopPromise.map.get(loopId);

  if (loop.tid) {
    clearTimeout(loop.tid);
  }

  return global.Promise.resolve();
}

/**
 * Used for each loop created by the loopPromise.
 */
class LoopObject {
  constructor (id) {
    this.id = id;
    this.clear = false;
    this.loop = null;
    this.resolve = null;
    this.reject = null;
  }
}

/**
 * Loop a promise returning function.
 *
 * @param {promise}
 * @return {number}
 */
function loopPromise (promise, options = {}) {
  options = Object.assign({}, DEFAULT_LOOP_PROMISE_OPTIONS, options);

  const { delay } = options;

  loopPromise._id = loopPromise._id++ || 0;

  const loopObject = new LoopObject(loopPromise._id);
  loopPromise.map.set(loopObject.id, loopObject);

  /**
   * Returns a delayed promise if the the delay has not yet been met.
   *
   * @param {number}
   * @param {number}
   * @param {Mixed}
   */
  function delayLoop (start, delay, result) {
    const remaining = (delay - (Date.now() - start)),
          amount = (remaining > 0) ? remaining : 0;

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
  function delayIdentity (start, delay) {
    return result => {
      return delayLoop(start, delay, result);
    };
  }

  function loop (local) {
    const start = Date.now();

    return promise().
      then(delayIdentity(start, delay)).
      catch(delayIdentity(start, delay)).
      then(result => {
        if (loopObject.clear) {
          loopPromise.map.delete(loopObject.id);

          return global.Promise.reject();
        }

        return result;
      }).
      then(loop);
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
function delayPromise (amount, loopObject, result) {
  return new global.Promise((resolve, reject) => {
    loopObject.tid = setTimeout(_ => resolve(result), amount);
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
function createOptions (options, defaults = {}) {
  return Object.assign({}, defaults, options);
}

/**
 * Forward object based arguments with an override.
 *
 * @param {request} options
 * @param {string} resource type
 * @param {object} query params
 */
function forward (args, adjustments) {
  return lodash.zipWith(args, adjustments, (left, right) => {
    return Object.assign({}, left, right);
  });
}

// Default options for the wrapRequest middleware parameter.
const DEFAULT_WRAP_REQUEST_MIDDLEWARE = {
  pre: lodash.identity,
  post: lodash.identity,
  reject: function (error) {
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
function wrapRequest (request, middleware) {
  middleware = lodash.defaults(middleware, DEFAULT_WRAP_REQUEST_MIDDLEWARE);

  const { pre, post, reject } = middleware;

  const wrapper = options => request(pre(options)).then(post, reject);

  ['del',
   'delete',
   'get',
   'patch',
   'post',
   'put'
  ].forEach(method => {
    wrapper[method] = options => {
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
function requireDirectory (directory, predicate, iteratee) {
  const requireObjects = _getRequireObjects(...arguments);

  return _requireRequireObjects(requireObjects);
}

/**
 * Given an array of export objects, a reduced object is returned.
 *
 * @param {array[object]}
 * @return {object}
 */
function _requireRequireObjects (requireObjects) {
  return requireObjects.reduce((result, requireObject) => {
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
function _getRequireObjects (directory, predicate, iteratee) {
  return fs.readdirSync(directory).reduce((result, file) => {
    const pathObject = path.parse(file);

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
function formatPayload (payload) {
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
function remapObjectPaths (object, paths = {}) {
  return lodash.reduce(object, (result, value, key) => {
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
function _createEnvironmentMap (key, environments, env) {
  if (lodash.has(env, key)) {
    const current = env[key];

    return { current, environments: Object.assign({}, environments) };
  } else {
    throw new Error(`Could not create an environment map, no environment variable named: ${key} could be found.`);
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
function resolveToken (options) {
  if (!lodash.isNil(options.token)) {
    return options.token;
  }

  if (lodash.has(process.env, options.token_env)) {
    const value = lodash.get(process.env, options.token_env);

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
function resolveEid (options) {
  if ('environment' in options && !lodash.isNil(options.environment)) {
    return options.environment;
  }

  if (options.deduce) {
    const env = options.env;

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
function deduceEid (key, environments, env) {
  const map = _createEnvironmentMap(key, environments, env);

  if (lodash.has(map.environments, map.current)) {
    return map.environments[map.current];
  } else {
    throw new Error(`Could not find the current environment: ${map.current} in the environments passed.`);
  }
}

module.exports = {
  clearLoop,
  createOptions,
  deduceEid,
  formatPayload,
  forward,
  forwardThis,
  loopPromise,
  remapObjectPaths,
  requireDirectory,
  resolveEid,
  resolveToken,
  resourceToType,
  wrapRequest
};
