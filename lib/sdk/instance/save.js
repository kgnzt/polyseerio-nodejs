'use strict';

const lodash              = require('lodash'),
      { getResourcePath } = require('../helper');

/**
 * Save an instance.
 *
 * @param {Resource}
 * @param {object}
 * @return {Promise}
 */
function save (instance, options) {
  const uri = getResourcePath(instance.resource, { eid: instance.eid });

  if (lodash.isNull(instance.eid)) {
    throw new Error(`Could not deduce environment of instance, eid set to: ${instance.eid}`);
  }

  if (instance.isNew) {
    return instance._request.post({
      uri,
      body: instance.toJSON()
    });
  }
}

module.exports = save;
