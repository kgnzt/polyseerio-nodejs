'use strict';

var lodash = require('lodash'),
    _require = require('../../helper'),
    clearLoop = _require.clearLoop;

/**
 * Clear an attach heartbeat for an instance.
 *
 * @param {instance} 
 * @param {object}
 * @return {Promise}
 */
function detach(instance, options) {
  if (lodash.has(instance, '_loopId') && !lodash.isNil(instance._loopId)) {
    return clearLoop(instance._loopId).then(function (_) {
      instance._loopId = null;

      return 'cleared';
    });
  }

  return global.Promise.resolve('not beating');
}

module.exports = detach;