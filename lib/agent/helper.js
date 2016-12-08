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

const attachToProcess = lodash.curry(_attachToProcess);

/**
 * Generates an iteratee for handler work.
 *
 * @param {object} a specific type of handlers
 * @param {function}
 * @param {...}
 * @return {function}
 */
function _createHandlerIteratee (handlers, iteratee, ...args) {
  return function (value, item) {
    if (lodash.has(handlers, item)) {
      return iteratee(handlers, value, item, ...args);
    }
  
    return global.Promise.reject(new Error(`Could not a handler subtype: ${item}.`));
  };
}

/**
 * Returns a handling function that can be passed iteratee work.
 *
 * @param {function}
 * @return {function}
 */
function _createHandler (iteratee) {
  return function (handler, type, config, ...args) {
    if (!lodash.has(handler, type)) {
      return global.Promise.reject(new Error(`Could not find a handler type: ${type}.`));
    }

    logger.log('debug', `Performing handler work for: ${iteratee.name}.`);

    const work = lodash.map(config, iteratee(handler[type], ...args));

    return global.Promise.all(work);
  };
}

/**
 * Generates a handler setup function.
 *
 * @param {object} a specific type of handlers
 * @param {...}
 * @return {function}
 */
function _setup (handlers, ...args) {
  return _createHandlerIteratee(handlers, (handlers, value, item, ...args) => {
    logger.log('debug', `Setting up handler: ${item}.`);

    const handler = lodash.get(handlers, item);

    if (HandlerInterface.SETUP in handler) {
      return handler[HandlerInterface.SETUP](...args);
    } else if (lodash.isFunction(handler)) {
      return handler(...args);
    }

    return global.Promise.resolve();
  }, ...args);
}

const setup = lodash.curry(_setup);

/**
 * Generates a handler teardown function.
 *
 * @param {object} a specific type of handlers
 * @param {...}
 * @return {function}
 */
function _teardown (handlers, ...args) {
  return _createHandlerIteratee(handlers, (handlers, value, item, ...args) => {
    if (HandlerInterface.TEARDOWN in handlers[item]) {
      logger.log('debug', `Tearing down handler: ${item}.`);

      return handlers[item][HandlerInterface.TEARDOWN](...args);
    }

    return global.Promise.resolve();
  }, ...args);
}

const teardown = lodash.curry(_teardown);

const setupWithHandler = lodash.curry(_createHandler(setup));

const teardownWithHandler = lodash.curry(_createHandler(teardown));

module.exports = {
  generateName,
  shouldHandle,
  resolveName,
  filterEnabledHandlers,
  attachToProcess,
  setupWithHandler,
  teardownWithHandler
};
