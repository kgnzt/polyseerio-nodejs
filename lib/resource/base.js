'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var lodash = require('lodash'),
    _require = require('../helper'),
    resolveEid = _require.resolveEid;

/**
 * Base resource class.
 */

var Base = function Base() {
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, Base);

  if (lodash.has(attributes, 'eid')) {
    this.eid = attributes.eid;
  } else {
    this.eid = resolveEid(this.copts || {});
  }

  this._attributes = attributes;
};

module.exports = Base;