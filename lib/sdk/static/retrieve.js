'use strict';

/**
 * Create a retrieve method for a resource.
 *
 * @param {request} options
 * @param {string} resource type
 * @return {function}
 */
function retrieve (request, resource) {
  /**
   * Retrieve a resource.
   *
   * Implies the resource is a singleton.
   *
   * @param {object} options
   * @return {Promise}
   */
  return (options) => {
    return request.get({});
  };
}

module.exports = retrieve;
