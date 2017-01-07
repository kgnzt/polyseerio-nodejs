'use strict';

const factStatic            = require('../static/fact'),
      { instanceToContext } = require('../helper');

/**
 * Send fact metric for an instance.
 *
 * @param {Resource} 
 * @param {key} 
 * @param {value}
 * @return {Promise}
 */
function fact (instance, facts, options) {
  return factStatic(
    instance.get('id'),
    facts,
    options,
    instanceToContext(instance)
  );
}

module.exports = fact;
