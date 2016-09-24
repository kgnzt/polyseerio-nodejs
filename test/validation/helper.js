'use strict';

const polyseerio = require('../../'),
      { ROOT_KEY } = require('./config');

function getUniqueName () {
  getUniqueName.count = ++getUniqueName.count || 1;

  return `alpha-${getUniqueName.count}-${Date.now()}`;
}

function getClient () {
  return polyseerio(ROOT_KEY, { deduce: false });
}

function getSDK (sdk) {
  const client = getClient();

  if (!(sdk in client)) {
    throw new Error(`Asked for sdk ${sdk} that is not in client.`);
  }

  return client[sdk];
}

module.exports = {
  getClient,
  getSDK,
  getUniqueName
};
