'use strict';

/**
 * Find a resource by primary id.
 *
 * @param {object}
 * @param {string}
 * @param {object}
 * @return {Promise}
 */
function findById (id, options, context = {}) {
  return context.request.get({ 
    uri: context.uri
  });
}

module.exports = findById;
