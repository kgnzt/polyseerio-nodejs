'use strict';

const lodash = require('lodash');

/**
 * Retreive an attribute.
 *
 * @param {Resoure}
 * @param {string}
 * @param {mixed}
 * @return {mixed}
 */
function get (instance, key, def = undefined) {
  return lodash.get(instance._attributes, key, def);
}

module.exports = get;
