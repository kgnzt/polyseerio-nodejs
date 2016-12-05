'use strict';

const { clearLoop } = require('../../helper');

/**
 * Detach an instance.
 *
 * @param {object} 
 * @param {object}
 * @return {Promise}
 */
function detach () {
  /*jshint validthis:true */
  // need to ask (is attached);
  if ('loopId' in this) {
    /*jshint validthis:true */
    clearLoop(this.loopId);
  } else {
    throw new Error('Ask to detach when no loopId was present.');
  }
}

module.exports = detach;
