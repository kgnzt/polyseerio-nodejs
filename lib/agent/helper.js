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
function resolveName (options) {
  if (lodash.has(options, 'name') && !lodash.isNil(options.name)) {
    return lodash.get(options, 'name');
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
function _attachToProcess (listners, proc, event, client, instance) {
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
function _createSubtypeIterator (handlers, iteratee, ...args) {
  return function (value, item) {
    if (lodash.has(handlers, item)) {
      return iteratee(handlers, value, item, ...args);
    }
  
    return global.Promise.reject(new Error(`Could not find handler subtype: ${item}.`));
  };
}

/**
 * Return a handler function.
 *
 * @param {function}
 * @return {function}
 */
function _createHandler (iteratee) {
  return function (map, client, config, type, ...args) {
    if (lodash.has(map, type)) {
      if (lodash.has(config, type)) {
        logger.log('debug', `Performing handler work for: ${type}.`);

        const work = lodash.map(config[type], iteratee(map[type], client, ...args));

        return global.Promise.all(work);
      }

      return global.Promise.resolve([]);
    }

    return global.Promise.reject(new Error(`Could not find handler type: ${type}.`));
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
  return _createSubtypeIterator(handlers, (handlers, value, item, ...args) => {
    logger.log('debug', `Setting up handler: ${item}.`);

    const handler = lodash.get(handlers, item);

    if (HandlerInterface.SETUP in handler) {
      return handler[HandlerInterface.SETUP](value, ...args);
    } else if (lodash.isFunction(handler)) {
      return handler(value, ...args);
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
  return _createSubtypeIterator(handlers, (handlers, value, item, ...args) => {
    if (HandlerInterface.TEARDOWN in handlers[item]) {
      logger.log('debug', `Tearing down handler: ${item}.`);

      return handlers[item][HandlerInterface.TEARDOWN](...args);
    }

    return global.Promise.resolve();
  }, ...args);
}

/**
 * Reducing function for enabled handlers.
 *
 * @param {object}
 * @param {object}
 * @param {string}
 * @return {object}
 */
function reduceHandlerSubtypeOption (acc, config, key) {
  if (shouldHandle(config)) {
    acc[key] = config;
  }

  return acc;
}

/**
 * Given handler subtype options, only those enabled are returned.
 */
function filterEnabledSubtypeOptions (subtypeOptions) {
  return lodash.reduce(subtypeOptions, reduceHandlerSubtypeOption, {});
}

/**
 * Given agent options, only enabled options will be returned.
 *
 * @param {object}
 * @return {object}
 */
function filterHandlers (options) {
  return lodash.reduce(options, (acc, subtypeOptions, key) => {
    acc[key] = filterEnabledSubtypeOptions(subtypeOptions);

    return acc;
  }, {});
}

/**
 * Extract handler options and filter them based on if they are enabled or not.
 *
 * @param {object}
 * @return {object}
 */
function extractHandlerOptions (options) {
  // gather only handler type options.
  //options = extractHandlerTypeOptions(options);

  // filter handler options to those that are enabled.
  return filterHandlers(options);
}

const teardown = lodash.curry(_teardown);

const setupWithHandler = lodash.curry(_createHandler(setup));

const teardownWithHandler = lodash.curry(_createHandler(teardown));

module.exports = {
  generateName,
  shouldHandle,
  resolveName,
  reduceHandlerSubtypeOption,
  filterEnabledSubtypeOptions,
  filterEnabledHandlers,
  filterHandlers,
  extractHandlerOptions,
  attachToProcess,
  setupWithHandler,
  teardownWithHandler
};
