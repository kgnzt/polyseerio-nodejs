'use strict';

const lodash = require('lodash');

/**
 * Peform a name based upsert for a resource.
 *
 * @param {client.Resource} a resource
 * @param {object} upsert attributes
 * @return {Promise}
 */
function upsert(Resource, attributes) {
  if (!lodash.has(attributes, 'name')) {
    return global.Promise.reject(new TypeError('Upsert requires a name in attributes.'));
  }

  return Resource.findByName(attributes.name).
    then(lodash.identity, error => {
      if (error.statusCode === 404) {
        return Resource.create(attributes);
      }

      return global.Promise.reject(error);
   });
}

module.exports = {
  upsert
};
