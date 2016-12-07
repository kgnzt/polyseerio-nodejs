'use strict';

const messageStatic = require('../static/message');

/**
 * Create a message instance method for a resource.
 *
 * @param {Resource} 
 * @param {...}
 * @return {Promise}
 */
function message (instance, ...args) {
  return messageStatic(instance.id, ...args);
}

module.exports = message;
