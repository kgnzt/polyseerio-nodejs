'use strict';

const { clearLoop } = require('../../helper');

/**
 * Detach an instance.
 *
 * @param {object} 
 * @param {object}
 * @return {Promise}
 */
function detach (instance) {
  // need to ask (is attached); should be instance.detach
  if ('loopId' in instance) {
    /*jshint validthis:true */
    clearLoop(instance.loopId);
  } else {
    throw new Error('Ask to detach when no loopId was present.');
  }
}

module.exports = detach;
