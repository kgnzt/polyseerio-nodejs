'use strict';

var messageStatic = require('../static/message');

/**
 * Create a message instance method for a resource.
 *
 * @param {Resource} 
 * @param {...}
 * @return {Promise}
 */
function message(instance) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return messageStatic.apply(undefined, [instance.id].concat(args));
}

module.exports = message;