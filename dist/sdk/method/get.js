'use strict';

var lodash = require('lodash');

/**
 * Retreive an attribute.
 *
 * @param {Resoure}
 * @param {string}
 * @param {mixed}
 * @return {mixed}
 */
function get(instance, key) {
  var def = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

  return lodash.get(instance._attributes, key, def);
}

module.exports = get;