'use strict';

/**
 * Create a check method for a resource.
 *
 * @param {request} options
 * @param {string} resource type
 * @return {function}
 */
function check (request, resource) {
  /**
   * Check a resource.
   *
   * @param {object} options
   * @return {Promise}
   */
  return (options) => {
    return request.get({});
  };
}

module.exports = check;
