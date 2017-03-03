'use strict';

const lodash         = require('lodash'),
      { resolveEid } = require('../helper');

/**
 * Base resource class.
 */
class Base {
  constructor (attributes = {}) {
    if (lodash.has(attributes, 'eid')) {
      this.eid = attributes.eid;
    } else {
      this.eid = resolveEid(this.copts || {});
    }

    this._attributes = attributes;
  }
}

module.exports = Base;
