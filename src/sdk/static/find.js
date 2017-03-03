'use strict';

/**
 * Find a collection of a resource type.
 *
 * @param {object}
 * @param {object}
 * @param {object}
 * @return {Promise}
 */
function find (query, options, context = {}) {
  query = query || {};

  return context.request.get({
    uri: context.uri,
    qs: query,
  });
}

module.exports = find;
