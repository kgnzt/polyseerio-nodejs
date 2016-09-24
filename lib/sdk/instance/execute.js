'use strict';

const executeStatic = require('../static/execute');

/**
 * Create an execute instance method for a resource.
 *
 * @param {request} 
 * @param {string}
 * @return {function}
 */
function execute (request, resource) {
  /**
   * Execute a resource.
   *
   * @param {object}
   * @return {Promise}
   */
  return (options) => {
    return executeStatic(this.id, ...arguments);
  };
}

module.exports = execute;
