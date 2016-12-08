'use strict';

const lodash        = require('lodash'),
      { clearLoop } = require('../../helper');

/**
 * Clear an attach heartbeat for an instance.
 *
 * @param {instance} 
 * @param {object}
 * @return {Promise}
 */
function detach (instance, options) {
  if (lodash.has(instance, '_loopId') && 
    !lodash.isNil(instance._loopId)
  ) {
    return clearLoop(instance._loopId).
      then(_ => {
        instance._loopId = null;

        return 'cleared';
      });
  }

  return global.Promise.resolve('not beating');
}

module.exports = detach;
