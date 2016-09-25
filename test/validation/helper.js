'use strict';

const polyseerio   = require('../../'),
      { ROOT_KEY } = require('./config');

const TESTING_ENVIRONMENT = {
  name: 'validation-testing',
  description: 'Create for polyseerio node-js validation testing.'
}

/**
 * Ensure a validation-testing environment exists.
 *
 * @param {polyseerio.Client}
 * @return {Promise}
 */
function setupValidationEnvironment (Client) {
  return Client.Environment.findByName(TESTING_ENVIRONMENT.name).
    then(_ => _, error => {
      return Client.Environment.create(TESTING_ENVIRONMENT);
    }).
    then(console.log);
}

/**
 * Perform clean up of the validation-testing environment.
 *
 * @param {polyseerio.Client}
 * @return {Promise}
 */
function cleanupValidationEnvironment (Client) {
  return Client.Environment.findByName(TESTING_ENVIRONMENT.name).
    then(environment => {
      Client.Environment.remove(environment.id);
    });
}

/**
 * Create a unique name.
 *
 * @return {string}
 */
function getUniqueName () {
  getUniqueName.count = ++getUniqueName.count || 1;

  return `alpha-${getUniqueName.count}-${Date.now()}`;
}

/**
 * Get an instance of the polyseer.io client.
 *
 * @return {polyseerio}
 */
function getClient () {
  return polyseerio(ROOT_KEY, { deduce: false });
}

/**
 * Get a specific sdk from the polyseer.io client.
 *
 * @return {mixed}
 */
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
  getUniqueName,
  setupValidationEnvironment,
  cleanupValidationEnvironment
};
