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
  const uri = getResourcePath(instance.resource, { eid: instance.eid, id: instance.id });

  // TODO: need to avoid even generating another instance, there is no need.
  // TODO: need to make a raw, non factory instance creating request.
  if (instance.isNew()) {
    return instance._request.post({
      uri,
      body: instance.toJSON()
    }).then(result => {
      // TODO: i'm not sure if I could possibly hate this more..
      instance.setProperties(result._attributes);

      return instance;
    });
  } else {
    return instance._request.put({
      uri,
      body: instance.toJSON()
    }).then(result => {
      // TODO: i'm not sure if I could possibly hate this more..
      instance.setProperties(result._attributes);

      return instance;
    });
  }
}

module.exports = save;
