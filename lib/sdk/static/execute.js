'use strict';

const { getResourcePath,
        reduceOptions,
        resolveEid } = require('../helper');

const DEFAULT_OPTIONS = {};

/**
 * Execute a resource.
 *
 * @param {request}
 * @param {string}
 * @param {object}
 * @param {object}
 * @return {Promise}
 */
function execute (
  request, 
  resource,
  copts,
  options
) {
  return global.Promise.resolve();
}

module.exports = execute;
