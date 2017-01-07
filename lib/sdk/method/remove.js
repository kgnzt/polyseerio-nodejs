'use strict';

const removeStatic          = require('../static/remove'),
      { instanceToContext } = require('../helper');

/**
 * Create a remove instance method for a resource.
 *
 * @param {request} 
 * @param {...}
 * @return {Promise}
 */
function remove (instance, options) {
  const context = instanceToContext(instance);

  return removeStatic(
    instance.get('id'), 
    options,
    context
  );
}

module.exports = remove;
