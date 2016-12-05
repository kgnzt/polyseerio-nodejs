'use strict';

const polyseerio = require('../../');

function getClient () {
  return polyseerio({ token: 'alpha', deduce: false });
}

module.exports = {
  getClient
};
