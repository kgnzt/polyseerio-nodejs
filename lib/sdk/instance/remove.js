'use strict';

const removeStatic = require('../static/remove');

/**
 * Create a remove instance method for a resource.
 *
 * @param {request} 
 * @param {...}
 * @return {Promise}
 */
function remove (instance, ...args) {
  return removeStatic(instance.id, ...args);
}

module.exports = remove;
