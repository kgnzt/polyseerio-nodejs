'use strict';

/**
 * Convert an instance to a plain JSON object.
 *
 * @param {Resoure}
 * @return {object}
 */

function isNew(instance) {
  return !('id' in instance) || instance.id === null;
}

module.exports = isNew;