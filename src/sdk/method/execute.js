'use strict';

const executeStatic = require('../static/execute');

/**
 * Create an execute instance method for a resource.
 *
 * @param {request} 
 * @param {string}
 * @return {function}
 */
function execute (instance, ...args) {
  return executeStatic(instance.id, ...args);
}

module.exports = execute;
