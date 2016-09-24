'use strict';

const messageStatic = require('../static/message');

/**
 * Create a message instance method for a resource.
 *
 * @param {request} 
 * @param {string}
 * @return {function}
 */
function message (request, resource) {
  /**
   * Trigger a resource.
   *
   * @param {object}
   * @param {object}
   * @return {Promise}
   */
  return (message, options) => {
    return messageStatic(this.id, ...arguments);
  };
}

module.exports = message;
