'use strict';

const factStatic = require('../static/fact');

/**
 * Send fact metric for an instance.
 *
 * @param {Resource} 
 * @param {key} 
 * @param {value}
 * @return {Promise}
 */
function fact (instance, facts, options) {
  // TODO: convert kv into facts

  return factStatic(instance._request, instance.resource, {
    environment: instance.eid
  }, instance.id, facts, options);
}

module.exports = fact;
