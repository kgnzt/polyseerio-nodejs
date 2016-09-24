'use strict';

const polyseerio = require('../../');

function getClient () {
  return polyseerio('alpha', { deduce: false });
}

module.exports = {
  getClient
};
