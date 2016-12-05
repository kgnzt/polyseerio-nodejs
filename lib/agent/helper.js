'use strict';

const lodash = require('lodash');

/**
 * Returns a unique name.
 *
 * @return {string}
 */
function generateName () {
  return 'nodejs-test';
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
function _handle (handlers, ...args) {
  return function (value, item) {
    if (lodash.has(handlers, item)) {
      return handlers[item](...args);
    }
  
    return global.Promise.reject(new Error(`Could not find a handler setup for type: ${item}.`));
  }
}

// curried version for use with _setupWithHandler
const handle = lodash.curry(_handle);

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

  const setups = lodash.map(config, handle(handler[type], ...args));

  return global.Promise.all(setups);
}

// exported version setupWithHandler
const setupWithHandler = lodash.curry(_setupWithHandler);

module.exports = {
  generateName,
  attachToProcess,
  setupWithHandler
};
