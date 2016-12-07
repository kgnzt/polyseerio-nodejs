'use strict';

const lodash           = require('lodash'),
      logger           = require('../logger'),
      HandlerInterface = require('./handler/interface');

/**
 * Determines if a value indicates that the config key should
 * be handled.
 *
 * @param {mixed}
 * @return {boolean}
 */
function shouldHandle (value) {
  if (value === true) {
    return value;
  }

  if (lodash.isObject(value) && lodash.has(value, 'enabled')) {
    return lodash.get(value, 'enabled');
  }

  return false;
}

/**
 * Reducing function for enabled handlers.
 *
 * @param {object}
 * @param {object}
 * @param {string}
 * @return {object}
 */
function _reduceConfigHandler (acc, config, key) {
  if (shouldHandle(config)) {
    acc[key] = config;
  }

  return acc;
}

/**
 * Returns a unique name
 *
 * @return {string}
 */
function filterEnabledHandlers (config) {
  return lodash.reduce(config, _reduceConfigHandler, {});
}

/**
 * Returns a unique name.
 *
 * @return {string}
 */
function generateName () {
  return 'nodejs-test';
}

/**
 * Given an agent config, a name will be resolved.
 *
 * @param {object}
 * @return {string}
 */
function resolveName (config) {
  if (lodash.has(config, 'name') && !lodash.isNil(config.name)) {
    return lodash.get(config, 'name');
  }

  return generateName();
}

/**
 * Attaches a listener result to a process event after passing it a Polyseer.io 
 * client and Polyseer.io instance instance.
 *
 * @param {object}
 * @param {string}
 * @param {Client}
 * @param {Instance}
 * @param {process}
 */
function _attachToProcess (listners, event, client, instance, proc) {
  logger.log('debug', `Attaching an ${event} listener to process.`);

  proc.on(event, listners[event](client, instance));
}

// exported version attachToProcess
const attachToProcess = lodash.curry(_attachToProcess);

/**
 * Creates a handler for a config item.
 *
 * @param {object} a specific type of handlers
 * @param {...}
 * @return {Promise}
 */
function _setup (handlers, ...args) {
  return function (value, item) {
    if (lodash.has(handlers, item)) {
      logger.log('debug', `Executing handler for: ${item}.`);

      const handler = lodash.get(handlers, item);

      if (HandlerInterface.SETUP in handler) {
        return handler[HandlerInterface.SETUP](...args);
      } else if (lodash.isFunction(handler)) {
        return handler(...args);
      }

      return global.Promise.resolve();
    }
  
    return global.Promise.reject(new Error(`Could not find a handler setup for type: ${item}.`));
  };
}

// curried version for use with _setupWithHandler
const setup = lodash.curry(_setup);

/**
 * Routine takes a handler object, a handler type, a config for that handler
 * type, iterates over the config calling the specific handler for each
 * config item while forwading any extra arguments to it.
 *
 * This is used by the executor to create a setup method that can be used
 * with an agent config in order to direct configuration setup.
 *
 * @param {object}
 * @param {string}
 * @param {object}
 * @param {...}
 * @return {Promise}
 */
function _setupWithHandler (handler, type, config, ...args) {
  if (!lodash.has(handler, type)) {
    return global.Promise.reject(new Error(`Could not find a handler for type: ${type}.`));
  }

  logger.log('debug', `Setting up handlers for: ${type}.`);

  const setups = lodash.map(config, setup(handler[type], ...args));

  return global.Promise.all(setups);
}

// exported version setupWithHandler
const setupWithHandler = lodash.curry(_setupWithHandler);

function _teardown (handlers, ...args) {
  return function (value, item) {
    if (lodash.has(handlers, item) && 
      HandlerInterface.TEARDOWN in handlers[item]
    ) {
      logger.log('debug', `Handler tearing down: ${item}.`);

      return handlers[item][HandlerInterface.TEARDOWN](...args);
    }
  
    return global.Promise.reject(new Error(`Could not find a handler setup for type: ${item}.`));
  };
}

// curried version for use with _teardown
const teardown = lodash.curry(_teardown);

/**
 * Routine takes a handler object, a handler type, a config for that
 * handler, iterates over the config checking if the handler has a teardown
 * function for that handler that should be called for cleanup.
 *
 * @param {object}
 * @param {string}
 * @param {object}
 * @param {...}
 * @return {Promise}
 */
function _teardownWithHandler (handler, type, config, ...args) {
  if (!lodash.has(handler, type)) {
    return global.Promise.reject(new Error(`Could not find a handler for type: ${type}.`));
  }

  logger.log('debug', `Tearing down handlers for: ${type}.`);

  const setups = lodash.map(config, teardown(handler[type], ...args));

  return global.Promise.all(setups);
}

// exported version teardownWithHandler
const teardownWithHandler = lodash.curry(_teardownWithHandler);

module.exports = {
  generateName,
  shouldHandle,
  resolveName,
  filterEnabledHandlers,
  attachToProcess,
  setupWithHandler,
  teardownWithHandler
};
