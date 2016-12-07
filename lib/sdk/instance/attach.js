'use strict';

const attachStatic = require('../static/attach');

/**
 * Create an attach instance method for a resource.
 *
 * @param {request} 
 * @param {string}
 * @return {function}
 */
function attach (instance, ...args) {
  return attachStatic(instance.id, ...args);
}

module.exports = attach;
