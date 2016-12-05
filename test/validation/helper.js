'use strict';

const lodash       = require('lodash'),
      polyseerio   = require('../../'),
      { ROOT_KEY } = require('./config');

const TestEnvironment = {
  name: 'validation-testing',
  description: 'Create for polyseerio node-js validation testing.'
};

const DEFAULT_CLIENT_OPTIONS = {
  deduce: false,
  environment: TestEnvironment.name
};

/**
 * Create an environment if it does not exist.
 *
 * @param {Client.Environment}
 * @return {object}
 */
function ensureEnvironment (Environment, environment) {
  return removeEnvironment(Environment, environment).
    then(_ => {
      return Environment.findByName(environment.name);
    }).
    then(_ => _, error => {
      return Environment.create(environment);
    });
}

/**
 * Remove an environment if it does not exist.
 *
 * @param {Client.Environment}
 * @return {object}
 */
function removeEnvironment (Environment, environment) {
  return Environment.findByName(environment.name).
    then(data => {
      return Environment.remove(data.id);
    }, error => {
      return;
    });
}

/**
 * Create environments if they don't exist.
 *
 * @param {Client.Environment}
 * @return {array[object]}
 */
function ensureEnvironments (Environment, environments) {
  const ensure = lodash.curry(ensureEnvironment)(Environment),
        ensures = environments.map(ensure);

  return global.Promise.all(ensures);
}

/**
 * Remove environments if they exist.
 *
 * @param {Client.Environment}
 * @return {array[object]}
 */
function removeEnvironments (Environment, environments) {
  const remove = lodash.curry(removeEnvironment)(Environment),
        removes = environments.map(remove);

  return global.Promise.all(removes);
}

/**
 * Ensure a validation-testing environment exists.
 *
 * @param {object}
 * @return {Promise}
 */
function setup (options) {
  const Client = getClient(options);

  return ensureEnvironments(Client.Environment, [TestEnvironment]).
    then(_ => {
      return global.Promise.resolve(Client);
    });
}

/**
 * Ensure a validation-testing environment exists.
 *
 * @param {polyseerio.Client}
 * @return {Promise}
 */
function teardown (Client) {
  return removeEnvironments(Client.Environment, [TestEnvironment]);
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
function getClient (options = {}) {
  options = Object.assign({ token: ROOT_KEY }, DEFAULT_CLIENT_OPTIONS, options);

  return polyseerio(options);
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
  TestEnvironment,
  ensureEnvironments,
  removeEnvironments,
  getClient,
  getSDK,
  getUniqueName,
  setup,
  teardown
};
