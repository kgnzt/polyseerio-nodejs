'use strict';

const { getResourcePath,
        resolveEid } = require('../helper');

/**
 * Create a save instance method for a resource.
 *
 * @param {request} 
 * @param {string}
 * @return {function}
 */
function save (request, resource) {
  /**
   * Save a resource.
   *
   * @return {object}
   */
  return function (options) {
    const uri = getResourcePath(resource, { eid: this.eid });

    if (this.isNew) {
      return this.constructor.request.post({
        uri,
        body: this.toJSON()
      });
    }
  };
}

module.exports = save;
