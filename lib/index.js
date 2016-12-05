'use strict';

const lodash                 = require('lodash'),
      Enum                   = require('./enum'),
      Client                 = require('./client'),
      requestPromise         = require('request-promise'),
      Resource               = require('./resource'),
      { ACCESS_TOKEN_HEADER,
        DEFAULT_ENV,
        DEFAULT_TOKEN_ENV,
        DEFAULT_API_BASE_URL,
        DEFAULT_API_VERSION,
        DEFAULT_TIMEOUT }    = require('./constant'),
      { getBaseUrl }         = require('./url_builder'),
      { preRequest,
        postRequest,
        forwardCurry }       = require('./middleware'),
      { createResource }     = require('./resource/helper'),
      { createOptions,
        remapObjectPaths,
        wrapRequest }        = require('./helper');

/**
 * Resources that are required by the client API.
 */
const RequiredResources = [
  Resource.ALERT,
  Resource.CHANNEL,
  Resource.ENVIRONMENT,
  Resource.EVENT,
  Resource.EXPECTATION,
  Resource.INSTANCE,
  Resource.LOGIC_BLOCK,
  Resource.MEMBER,
  Resource.SETTING,
  Resource.TASK
];

/**
 * Client Resource path names.
 */
const ClientResourcePaths = {
  [Resource.ALERT]:       'Alert',
  [Resource.CHANNEL]:     'Channel',
  [Resource.ENVIRONMENT]: 'Environment',
  [Resource.EVENT]:       'Event',
  [Resource.EXPECTATION]: 'Expectation',
  [Resource.INSTANCE]:    'Instance',
  [Resource.LOGIC_BLOCK]: 'LogicBlock',
  [Resource.MEMBER]:      'Member',
  [Resource.SETTING]:     'Settings',
  [Resource.TASK]:        'Task'
};

/**
 * Default factory options.
 */
const DEFAULT_OPTIONS = {
  token:     null,
  agent:     {},
  env:       DEFAULT_ENV,
  token_env: DEFAULT_TOKEN_ENV,
  version:   DEFAULT_API_VERSION,
  timeout:   DEFAULT_TIMEOUT,
  deduce:    true
};

/**
 * Will attempt to resolve the API token.
 *
 * Returns undefined if one cannot be resolved.
 *
 * @param {string} token as passed by client constructor
 * @param {object} where to look in the environment for a token
 * @return {string|undefined}
 */
function resolveToken (options) {
  if (!lodash.isNil(options.token)) {
    return options.token;
  }

  if (lodash.has(process.env, options.token_env)) {
    const value = lodash.get(process.env, options.token_env);

    if (!lodash.isNil(value)) {
      return value;
    }
  }

  return null;
}

/**
 * Constructrs a polyseer.io client.
 *
 * @param {object} construction options
 * @return {Promise}
 */
function factory (options) {
  options = createOptions(options, DEFAULT_OPTIONS);

  const token = resolveToken(options);

  if (lodash.isNull(token)) {
    throw new TypeError(`Could not find an access token. None was passed and none could be found in the environment variable: ${options.token_env}.`);
  }

  const baseUrl = getBaseUrl(undefined, undefined, options.version),
        headers = {
          [ACCESS_TOKEN_HEADER]: token
        };

  let request = requestPromise.defaults({
    headers,
    baseUrl,
    json: true,
    resolveWithFullResponse: true,
    timeout: options.timeout
  });

  const pre = forwardCurry(preRequest, factory._callCount),
        post = forwardCurry(postRequest, factory._callCount);

  request = wrapRequest(request, pre, post);

  const Resources = RequiredResources.reduce((result, resource) => {
    result[resource] = createResource(resource, request, options, factory._callCount);

    return result;
  }, {});

  const resources = remapObjectPaths(Resources, ClientResourcePaths),
        clientOptions = { request, resources },
        client = new Client(factory._callCount, clientOptions);

  factory._callCount++; // for memoize in resource factory calls

  return client;
}

// call count is used to memoize resource factory calls
factory._callCount = 0;

Object.assign(factory, {
  ClientResourcePaths,
  RequiredResources,
  resolveToken
})

Object.assign(factory, Enum);

module.exports = factory;
