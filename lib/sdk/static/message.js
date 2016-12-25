'use strict';

/**
 * Message a resource.
 *
 * @param {request} options
 * @param {string} resource type
 * @return {function}
 */
function message (id, content, options, context = {}) {
  return context.request.post({
    uri: `${context.uri}/messages`,
    body: {
      content
    }
  });
}

module.exports = message;
