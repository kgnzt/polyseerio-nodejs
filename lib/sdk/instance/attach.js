'use strict';

const attachStatic = require('../static/attach');

/**
 * Create an attach instance method for a resource.
 *
 * @param {request} 
 * @param {string}
 * @return {function}
 */
function check (request, resource) {
  /**
   * Attach a resource.
   *
   * @param {object}
   * @return {Promise}
   */
  return (options) => {
    return attachStatic(this.id, ...arguments);
  };
}

module.exports = check;
