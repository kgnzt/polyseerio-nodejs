'use strict';

const { loopPromise } = require('../../helper'),
      { getResourcePath,
        reduceOptions,
        resolveEid }  = require('../helper');

/**
 * Available attachment strategies.
 */
const Strategy = {
  ID: 'id',
  NEW: 'new',
  NAME: 'name',
  FALLBACK: 'fallback'
};

/**
 * Default attach options.
 */
const DEFAULT_OPTIONS = {
  strategy: Strategy.FALLBACK,
  delay: 3000,
  deduce: true,
  env: 'NODE_ENV'
};

/**
 * Attachement strategy implementation.
 */
const StrategyHandler = {
  /**
   * Attempt to find the resource by name, if not found, create a new one
   * with the name passed and attach.
   *
   * @param {request}
   * @param {resource}
   * @param {string}
   * @param {object}
   * @return {Promise}
   */
  [Strategy.FALLBACK] (request, resource, uri, options) {
    if (!('identifier' in options)) {
      return global.Promise.reject(new Error(`Cannot attach as a ${resource} using the ${options.strategy} strategy without providing a name.`));
    }

    return request.get({
        uri: `${uri}/name/${options.identifier}`
      }).
      then(result => {
        return result;
      }, error => {
        if (error.statusCode === 404) {
          return request.post({
            uri,
            body: { name: options.identifier }
          });
        }

        return global.Promise.reject(error);
      }).
      then(data => {
        const loop = () => request.post({ uri: `${uri}/${data.id}/heartbeat` }),
              id = loopPromise(loop, { delay: options.delay });

        return global.Promise.resolve(data);
      });
  },

  /**
   * Attach to a primary id.
   *
   * @param {request}
   * @param {resource}
   * @param {string}
   * @param {object}
   * @return {Promise}
   */
  [Strategy.ID] (request, resource, uri, options) {
    if (!('identifier' in options)) {
      return global.Promise.reject(new Error(`Cannot attach as a ${resource} using the ${options.strategy} strategy without providing an id.`));
    }

    const loop = () => request.post({ uri: `${uri}/${options.identifier}/heartbeat` }),
          id = loopPromise(loop, { delay: options.delay });

    return global.Promise.resolve({});
  }
};

/**
 * Attach to a resource.
 *
 * @param {request}
 * @param {string}
 * @param {object}
 * @param {object}
 * @return {Promise}
 */
function attach (
  request, 
  resource, 
  copts, 
  identifier,
  options
) {
  options = reduceOptions(options, copts, DEFAULT_OPTIONS);

  if (identifier) {
    options.identifier = identifier;
  }

  const eid = resolveEid(options),
        uri = getResourcePath(resource, { eid });

  if (!(options.strategy in StrategyHandler)) {
    throw new TypeError(`Do not know how to attach using the ${options.strategy} strategy.`);
  }

  return StrategyHandler[options.strategy](request, resource, uri, options);
}

attach.Strategy = Strategy;

module.exports = attach;
