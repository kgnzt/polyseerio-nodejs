'use strict';

var factStatic = require('../static/fact'),
    _require = require('../helper'),
    instanceToContext = _require.instanceToContext;

/**
 * Send fact metric for an instance.
 *
 * @param {Resource} 
 * @param {key} 
 * @param {value}
 * @return {Promise}
 */
function fact(instance, facts, options) {
  return factStatic(instance.get('id'), facts, options, instanceToContext(instance));
}

module.exports = fact;