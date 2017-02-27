'use strict';

/**
 * Establish a resource fact.
 *
 * @param {object}
 * @param {string}
 * @param {object}
 * @param {object}
 * @return {Promise}
 */

function fact(id, facts, options) {
  var context = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  facts = facts || {};

  return context.request.post({
    uri: context.uri + '/facts',
    body: facts
  });
}

module.exports = fact;