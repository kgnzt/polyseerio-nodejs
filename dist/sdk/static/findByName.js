'use strict';

var ENVIRONMENT = require('../../enum').Resource.ENVIRONMENT;

/**
 * Find a resource by name.
 *
 * @param {string}
 * @param {object}
 * @param {string}
 * @param {object}
 * @return {Promise}
 */


function findByName(name, options) {
  var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  name = '/name/' + name;

  var uri = context.resource === ENVIRONMENT ? '/environments' + name : '' + context.uri + name;

  return context.request.get({
    uri: uri
  });
}

module.exports = findByName;