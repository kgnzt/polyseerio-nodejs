'use strict';

const lodash = require('lodash');

/**
 * Set multiple attribute.
 *
 * @param {Resoure}
 * @param {string}
 * @param {mixed}
 * @return {mixed}
 */
function setProperties (instance, properties = {}) {
  lodash.forEach(properties, (value, key) =>{
    instance.set(key, value);
  });

  return instance;
}

module.exports = setProperties;
