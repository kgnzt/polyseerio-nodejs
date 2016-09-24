'use strict';

const { loopPromise } = require('../../helper');

const { getResourcePath,
        createOptions,
        resolveEid } = require('../helper');

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
   * @param {object}
   */
  [Strategy.FALLBACK] (request, resource, uri, options) {
    return new global.Promise((resolve, reject) => {
      if (!('name' in options)) {
        return reject(new Error(`Cannot attach as a ${resource} using the ${options.strategy} strategy without providing a name.`));
      }

      return request.get({
          uri: `${uri}/name/${options.name}`
        }).
        then(result => {
          return result;
        }, error => {
          if (error.statusCode === 404) {
            return request.post({
              uri,
              body: { name: options.name }
            });
          }
  
          return global.Promise.reject(error);
        }).
        then((data) => {
          const loop = () => request.post({ uri: `${uri}/${data.id}/heartbeat` }),
                id = loopPromise(loop, { delay: options.delay });

          return global.Promise.resolve(data);
        });
    });
  }
};

/**
 * Create an attach method for a resource.
 *
 * @param {request} options
 * @param {string} resource type
 * @return {function}
 */
function attach (request, resource) {
  /**
   * Attach to a resource.
   *
   * @param {object} options
   * @return {Promise}
   */
  return (options) => {
    options = createOptions(options, DEFAULT_OPTIONS);

    const eid = resolveEid(options),
          uri = getResourcePath(resource, { eid });

    if (!(options.strategy in StrategyHandler)) {
      throw new TypeError(`Do not know how to attach using the ${options.strategy} strategy.`);
    }

    return StrategyHandler[options.strategy](request, resource, uri, options);
  };
}

attach.Strategy = Strategy;

module.exports = attach;
