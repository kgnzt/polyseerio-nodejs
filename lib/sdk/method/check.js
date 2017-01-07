'use strict';

const checkStatic = require('../static/check');

/**
 * Create a check instance method for a resource.
 *
 * @param {request} 
 * @param {string}
 * @return {function}
 */
function check (instance, ...args) {
  return checkStatic(instance.id, ...args);
}

module.exports = check;
