'use strict';

const removeStatic = require('../static/remove');

/**
 * Create a remove instance method for a resource.
 *
 * @param {request} 
 * @param {string}
 * @return {function}
 */
function remove (request, resource) {
  /**
   * Delete a resource.
   *
   * @param {object}
   * @return {Promise}
   */
  return (options) => {
    return removeStatic(this.id, ...arguments);
  };
}

module.exports = remove;
