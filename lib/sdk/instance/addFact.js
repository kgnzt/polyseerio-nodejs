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

  instance._heartbeatFacts.set(key, value);

  return global.Promise.resolve();
}

module.exports = addFact;
