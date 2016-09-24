'use strict';

/**
 * Create an execute method for a resource.
 *
 * @param {request} options
 * @param {string} resource type
 * @return {function}
 */
function execute (request, resource) {
  /**
   * Execute a resource.
   *
   * @param {object} options
   * @return {Promise}
   */
  return (options) => {
    return request.get({});
  };
}

module.exports = execute;
