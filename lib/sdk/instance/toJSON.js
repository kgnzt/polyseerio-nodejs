'use strict';

/**
 * Convert an instance to a plain JSON object.
 *
 * @param {Resoure}
 * @return {object}
 */
function toJSON (instance) {
  return instance._attributes;
}

module.exports = toJSON;
