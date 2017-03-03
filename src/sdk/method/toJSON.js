'use strict';

/**
 * Convert an instance to a plain JSON object.
 *
 * @param {Resoure}
 * @return {object}
 */
function toJSON (instance) {
  return Object.assign({}, instance._attributes);
}

module.exports = toJSON;
