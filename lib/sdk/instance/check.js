'use strict';

const checkStatic = require('../static/check');

/**
 * Create a check instance method for a resource.
 *
 * @param {request} 
 * @param {string}
 * @return {function}
 */
function check (request, resource) {
  /**
   * Check a resource.
   *
   * @param {object}
   * @return {Promise}
   */
  return (options) => {
    return checkStatic(this.id, ...arguments);
  };
}

module.exports = check;
