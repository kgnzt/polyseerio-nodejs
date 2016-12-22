'use strict';

const lodash = require('lodash');

/**
 * Attach facts as part of the instance monitoring.
 *
 * @param {Resource} 
 * @param {key} 
 * @param {value}
 * @return {Promise}
 */
function addFact (instance, key, value) {
  if (!lodash.has(instance, '_heartbeatFacts')) {
    instance._heartbeatFacts = new Map();
  }

  if (arguments.length === 3 && lodash.isString('key')) {
    instance._heartbeatFacts.set(key, value);
  }

  if (lodash.isPlainObject(key)) {
    lodash.forEach(key, (innerValue, innerKey) => {
      instance._heartbeatFacts.set(innerKey, innerValue);
    });
  }

  // TODO: should reject if invalid arguments or maybe throw TypeError?

  return global.Promise.resolve();
}

module.exports = addFact;
