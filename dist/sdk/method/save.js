'use strict';

var lodash = require('lodash'),
    _require = require('../helper'),
    getResourcePath = _require.getResourcePath;

/**
 * Save an instance.
 *
 * @param {Resource}
 * @param {object}
 * @return {Promise}
 */
function save(instance, options) {
  var uri = getResourcePath(instance.resource, { eid: instance.eid, id: instance.id });

  // TODO: need to avoid even generating another instance, there is no need.
  // TODO: need to make a raw, non factory instance creating request.
  if (instance.isNew()) {
    return instance._request.post({
      uri: uri,
      body: instance.toJSON()
    }).then(function (result) {
      // TODO: i'm not sure if I could possibly hate this more..
      instance.setProperties(result._attributes);

      return instance;
    });
  } else {
    return instance._request.put({
      uri: uri,
      body: instance.toJSON()
    }).then(function (result) {
      // TODO: i'm not sure if I could possibly hate this more..
      instance.setProperties(result._attributes);

      return instance;
    });
  }
}

module.exports = save;