'use strict';

const lodash                 = require('lodash'),
      Enum                   = require('./enum'),
      Client                 = require('./client'),
      requestPromise         = require('request-promise'),
      { Resource }           = require('./enum'),
      { ACCESS_TOKEN_HEADER,
        DEFAULT_ENV,
        DEFAULT_TOKEN_ENV,
        DEFAULT_LOG_LEVEL,
        DEFAULT_ENVIRONMENT,
        DEFAULT_HEARTBEAT_DELAY,
        DEFAULT_API_BASE_URL,
        DEFAULT_API_VERSION,
        DEFAULT_TIMEOUT }    = require('./constant'),
      { getBaseUrl }         = require('./url_builder'),
      { preRequest,
        postRequest,
        postReject,
        forwardCurry }       = require('./middleware'),
      { createResource }     = require('./resource/helper'),
      { resolveEid }         = require('./sdk/helper'),
      { resolveToken,
        createOptions,
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
  agent:           {},
  deduce:          true,
  env:             DEFAULT_ENV,
  environment:     DEFAULT_ENVIRONMENT,
  heartbeat_delay: DEFAULT_HEARTBEAT_DELAY, // implement this?
  log_level:       DEFAULT_LOG_LEVEL,       // need to implement this with logger
  timeout:         DEFAULT_TIMEOUT,
  token:           null,
  token_env:       DEFAULT_TOKEN_ENV,
  upsert_env:      true,
  version:         DEFAULT_API_VERSION
};

/**
 * Shorthand for creating a client and starting the agent.
 *
 * @param {...}
 * @return {Promise}
 */
function start (...args) {
  const client = factory(...args);

  return client.startAgent();
}

/**
 * Constructrs a polyseer.io client.
 *
 * @param {object} construction options
 * @return {Promise}
 */
function factory (options) {
  options = createOptions(options, DEFAULT_OPTIONS);

  options.environment = resolveEid(options);
  options.token = resolveToken(options);

  if (lodash.isNull(options.token)) {
    throw new TypeError(`Could not find an access token. None was passed and none could be found in the environment variable: ${options.token_env}.`);
  }

  const baseUrl = getBaseUrl(undefined, undefined, options.version),
        headers = {
          [ACCESS_TOKEN_HEADER]: options.token
        };

  let request = requestPromise.defaults({
    headers,
    baseUrl,
    json: true,
    resolveWithFullResponse: true,
    timeout: options.timeout
  });

  const pre = forwardCurry(preRequest, factory._callCount),
        post = forwardCurry(postRequest, factory._callCount),
        reject = forwardCurry(postReject, factory._callCount, request);

  request = wrapRequest(request, { pre, post, reject });

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
  start
});

Object.assign(factory, Enum);

module.exports = factory;
