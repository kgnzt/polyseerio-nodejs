'use strict';

var lodash = require('lodash');

/**
 * Set multiple attribute.
 *
 * @param {Resoure}
 * @param {string}
 * @param {mixed}
 * @return {mixed}
 */
function setProperties(instance) {
  var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  lodash.forEach(properties, function (value, key) {
    instance.set(key, value);
  });

  return instance;
}

module.exports = setProperties;