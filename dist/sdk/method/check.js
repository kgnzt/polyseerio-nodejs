'use strict';

var checkStatic = require('../static/check');

/**
 * Create a check instance method for a resource.
 *
 * @param {request} 
 * @param {string}
 * @return {function}
 */
function check(instance) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return checkStatic.apply(undefined, [instance.id].concat(args));
}

module.exports = check;