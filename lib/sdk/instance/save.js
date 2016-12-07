'use strict';

const lodash              = require('lodash'),
      { getResourcePath } = require('../helper');

/**
 * Save an instance.
 *
 * @param {request} 
 * @param {string}
 * @return {function}
 */
function save (options) {
  /*jshint validthis:true */
  const uri = getResourcePath(this.resource, { eid: this.eid });

  /*jshint validthis:true */
  if (lodash.isNull(this.eid)) {
    throw new Error(`Could not deduce environment of instance, eid set to: ${this.eid}`);
  }

  /*jshint validthis:true */
  if (this.isNew) {
    /*jshint validthis:true */
    return this._request.post({
      uri,
      body: this.toJSON()
    });
  }
}

module.exports = save;
