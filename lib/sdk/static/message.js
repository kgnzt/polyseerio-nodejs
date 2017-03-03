'use strict';

/**
 * Message a resource.
 *
 * @param {request} options
 * @param {string} resource type
 * @return {function}
 */

function message(id, content, options) {
  var context = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  return context.request.post({
    uri: context.uri + '/messages',
    body: {
      content: content
    }
  });
}

module.exports = message;