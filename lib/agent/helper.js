'use strict';

var lodash = require('lodash'),
    logger = require('../logger'),
    HandlerInterface = require('./handler/interface');

/**
 * Determines if a value indicates that the config key should
 * be handled.
 *
 * @param {mixed}
 * @return {boolean}
 */
function shouldHandle(value) {
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
function _reduceConfigHandler(acc, config, key) {
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
function filterEnabledHandlers(config) {
  return lodash.reduce(config, _reduceConfigHandler, {});
}

/**
 * Returns a unique name.
 *
 * @return {string}
 */
function generateName() {
  return 'nodejs-test';
}

/**
 * Given an agent config, a name will be resolved.
 *
 * @param {object}
 * @return {string}
 */
function resolveName(options) {
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
function _attachToProcess(listners, proc, event, client, instance) {
  logger.log('debug', 'Attaching an ' + event + ' listener to process.');

  proc.on(event, listners[event](client, instance));
}

var attachToProcess = lodash.curry(_attachToProcess);

/**
 * Generates an iteratee for handler work.
 *
 * @param {object} a specific type of handlers
 * @param {function}
 * @param {...}
 * @return {function}
 */
function _createSubtypeIterator(handlers, iteratee) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return function (value, item) {
    if (lodash.has(handlers, item)) {
      return iteratee.apply(undefined, [handlers, value, item].concat(args));
    }

    return global.Promise.reject(new Error('Could not find handler subtype: ' + item + '.'));
  };
}

/**
 * Return a handler function.
 *
 * @param {function}
 * @return {function}
 */
function _createHandler(iteratee) {
  return function (map, client, config, type) {
    if (lodash.has(map, type)) {
      if (lodash.has(config, type)) {
        logger.log('debug', 'Performing handler work for: ' + type + '.');

        for (var _len2 = arguments.length, args = Array(_len2 > 4 ? _len2 - 4 : 0), _key2 = 4; _key2 < _len2; _key2++) {
          args[_key2 - 4] = arguments[_key2];
        }

        var work = lodash.map(config[type], iteratee.apply(undefined, [map[type], client].concat(args)));

        return global.Promise.all(work);
      }

      return global.Promise.resolve([]);
    }

    return global.Promise.reject(new Error('Could not find handler type: ' + type + '.'));
  };
}

/**
 * Generates a handler setup function.
 *
 * @param {object} a specific type of handlers
 * @param {...}
 * @return {function}
 */
function _setup(handlers) {
  for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return _createSubtypeIterator.apply(undefined, [handlers, function (handlers, value, item) {
    for (var _len4 = arguments.length, args = Array(_len4 > 3 ? _len4 - 3 : 0), _key4 = 3; _key4 < _len4; _key4++) {
      args[_key4 - 3] = arguments[_key4];
    }

    logger.log('debug', 'Setting up handler: ' + item + '.');

    var handler = lodash.get(handlers, item);

    if (HandlerInterface.SETUP in handler) {
      return handler[HandlerInterface.SETUP].apply(handler, [value].concat(args));
    } else if (lodash.isFunction(handler)) {
      return handler.apply(undefined, [value].concat(args));
    }

    return global.Promise.resolve();
  }].concat(args));
}

var setup = lodash.curry(_setup);

/**
 * Generates a handler teardown function.
 *
 * @param {object} a specific type of handlers
 * @param {...}
 * @return {function}
 */
function _teardown(handlers) {
  for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }

  return _createSubtypeIterator.apply(undefined, [handlers, function (handlers, value, item) {
    for (var _len6 = arguments.length, args = Array(_len6 > 3 ? _len6 - 3 : 0), _key6 = 3; _key6 < _len6; _key6++) {
      args[_key6 - 3] = arguments[_key6];
    }

    if (HandlerInterface.TEARDOWN in handlers[item]) {
      var _handlers$item;

      logger.log('debug', 'Tearing down handler: ' + item + '.');

      // TODO: unit-test that value / config is passed to teardown
      return (_handlers$item = handlers[item])[HandlerInterface.TEARDOWN].apply(_handlers$item, [value].concat(args));
    }

    return global.Promise.resolve();
  }].concat(args));
}

/**
 * Reducing function for enabled handlers.
 *
 * @param {object}
 * @param {object}
 * @param {string}
 * @return {object}
 */
function reduceHandlerSubtypeOption(acc, config, key) {
  if (shouldHandle(config)) {
    acc[key] = config;
  }

  return acc;
}

/**
 * Given handler subtype options, only those enabled are returned.
 */
function filterEnabledSubtypeOptions(subtypeOptions) {
  return lodash.reduce(subtypeOptions, reduceHandlerSubtypeOption, {});
}

/**
 * Given agent options, only enabled options will be returned.
 *
 * @param {object}
 * @return {object}
 */
function filterHandlers(options) {
  return lodash.reduce(options, function (acc, subtypeOptions, key) {
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
function extractHandlerOptions(options) {
  // gather only handler type options.
  //options = extractHandlerTypeOptions(options);

  // filter handler options to those that are enabled.
  return filterHandlers(options);
}

var teardown = lodash.curry(_teardown);

var setupWithHandler = lodash.curry(_createHandler(setup));

var teardownWithHandler = lodash.curry(_createHandler(teardown));

module.exports = {
  generateName: generateName,
  shouldHandle: shouldHandle,
  resolveName: resolveName,
  reduceHandlerSubtypeOption: reduceHandlerSubtypeOption,
  filterEnabledSubtypeOptions: filterEnabledSubtypeOptions,
  filterEnabledHandlers: filterEnabledHandlers,
  filterHandlers: filterHandlers,
  extractHandlerOptions: extractHandlerOptions,
  attachToProcess: attachToProcess,
  setupWithHandler: setupWithHandler,
  teardownWithHandler: teardownWithHandler
};