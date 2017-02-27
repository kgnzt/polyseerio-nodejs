'use strict';

var removeStatic = require('../static/remove'),
    _require = require('../helper'),
    instanceToContext = _require.instanceToContext;

/**
 * Create a remove instance method for a resource.
 *
 * @param {request} 
 * @param {...}
 * @return {Promise}
 */
function remove(instance, options) {
  var context = instanceToContext(instance);

  return removeStatic(instance.get('id'), options, context);
}

module.exports = remove;