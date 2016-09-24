'use strict';

const triggerStatic = require('../static/trigger');

/**
 * Create a trigger instance method for a resource.
 *
 * @param {request} 
 * @param {string}
 * @return {function}
 */
function trigger (request, resource) {
  /**
   * Trigger a resource.
   *
   * @param {object}
   * @param {object}
   * @return {Promise}
   */
  return (payload, options) => {
    return triggerStatic(this.id, ...arguments);
  };
}

module.exports = trigger;
