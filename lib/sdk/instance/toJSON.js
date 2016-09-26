'use strict';

/**
 * Convert an instance to a plain JSON object.
 *
 * @return {object}
 */
function toJSON () {
  /*jshint validthis:true */
  return this._attributes;
}

module.exports = toJSON;
