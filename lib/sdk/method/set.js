'use strict';

/**
 * Set an attribute.
 *
 * @param {Resoure}
 * @param {string}
 * @param {mixed}
 * @return {mixed}
 */

function set(instance, key, value) {
  instance._attributes[key] = value;

  return instance;
}

module.exports = set;