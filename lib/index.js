'use strict';

var _ClientResourcePaths;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var lodash = require('lodash'),
    Enum = require('./enum'),
    Client = require('./client'),
    requestPromise = require('request-promise'),
    _require = require('./enum'),
    Resource = _require.Resource,
    _require2 = require('./constant'),
    ACCESS_TOKEN_HEADER = _require2.ACCESS_TOKEN_HEADER,
    DEFAULT_ENV = _require2.DEFAULT_ENV,
    DEFAULT_TOKEN_ENV = _require2.DEFAULT_TOKEN_ENV,
    DEFAULT_LOG_LEVEL = _require2.DEFAULT_LOG_LEVEL,
    DEFAULT_ENVIRONMENT = _require2.DEFAULT_ENVIRONMENT,
    DEFAULT_HEARTBEAT_DELAY = _require2.DEFAULT_HEARTBEAT_DELAY,
    DEFAULT_API_BASE_URL = _require2.DEFAULT_API_BASE_URL,
    DEFAULT_API_VERSION = _require2.DEFAULT_API_VERSION,
    DEFAULT_TIMEOUT = _require2.DEFAULT_TIMEOUT,
    _require3 = require('./url_builder'),
    getBaseUrl = _require3.getBaseUrl,
    _require4 = require('./middleware'),
    preRequest = _require4.preRequest,
    postRequest = _require4.postRequest,
    postReject = _require4.postReject,
    forwardCurry = _require4.forwardCurry,
    _require5 = require('./resource/helper'),
    createResource = _require5.createResource,
    _require6 = require('./helper'),
    resolveEid = _require6.resolveEid,
    resolveToken = _require6.resolveToken,
    createOptions = _require6.createOptions,
    remapObjectPaths = _require6.remapObjectPaths,
    wrapRequest = _require6.wrapRequest;

/**
 * Resources that are required by the client API.
 */
var RequiredResources = [Resource.ALERT, Resource.CHANNEL, Resource.ENVIRONMENT, Resource.EVENT, Resource.EXPECTATION, Resource.INSTANCE, Resource.LOGIC_BLOCK, Resource.MEMBER, Resource.SETTING, Resource.TASK];

/**
 * Client Resource path names.
 */
var ClientResourcePaths = (_ClientResourcePaths = {}, _defineProperty(_ClientResourcePaths, Resource.ALERT, 'Alert'), _defineProperty(_ClientResourcePaths, Resource.CHANNEL, 'Channel'), _defineProperty(_ClientResourcePaths, Resource.ENVIRONMENT, 'Environment'), _defineProperty(_ClientResourcePaths, Resource.EVENT, 'Event'), _defineProperty(_ClientResourcePaths, Resource.EXPECTATION, 'Expectation'), _defineProperty(_ClientResourcePaths, Resource.INSTANCE, 'Instance'), _defineProperty(_ClientResourcePaths, Resource.LOGIC_BLOCK, 'LogicBlock'), _defineProperty(_ClientResourcePaths, Resource.MEMBER, 'Member'), _defineProperty(_ClientResourcePaths, Resource.SETTING, 'Settings'), _defineProperty(_ClientResourcePaths, Resource.TASK, 'Task'), _ClientResourcePaths);

/**
 * Default factory options.
 */
var DEFAULT_OPTIONS = {
  agent: {},
  deduce: true,
  env: DEFAULT_ENV,
  environment: null, // this value is resolved, default null is correct
  heartbeat_delay: DEFAULT_HEARTBEAT_DELAY, // implement this?
  log_level: DEFAULT_LOG_LEVEL, // need to implement this with logger
  timeout: DEFAULT_TIMEOUT,
  token: null,
  token_env: DEFAULT_TOKEN_ENV,
  upsert_env: true,
  version: DEFAULT_API_VERSION
};

/**
 * Shorthand for creating a client and starting the agent.
 *
 * @param {...}
 * @return {Promise}
 */
function start() {
  var client = factory.apply(undefined, arguments);

  return client.startAgent();
}

/**
 * Constructrs a polyseer.io client.
 *
 * @param {object} construction options
 * @return {Promise}
 */
function factory(options) {
  options = createOptions(options, DEFAULT_OPTIONS);

  options.environment = resolveEid(options);
  options.token = resolveToken(options);

  if (lodash.isNull(options.token)) {
    throw new TypeError('Could not find an access token. None was passed and none could be found in the environment variable: ' + options.token_env + '.');
  }

  var baseUrl = getBaseUrl(undefined, undefined, options.version),
      headers = _defineProperty({}, ACCESS_TOKEN_HEADER, options.token);

  var request = requestPromise.defaults({
    headers: headers,
    baseUrl: baseUrl,
    json: true,
    resolveWithFullResponse: true,
    timeout: options.timeout
  });

  var pre = forwardCurry(preRequest, factory._callCount),
      post = forwardCurry(postRequest, factory._callCount),
      reject = forwardCurry(postReject, factory._callCount, request, options);

  request = wrapRequest(request, { pre: pre, post: post, reject: reject });

  var Resources = RequiredResources.reduce(function (result, resource) {
    result[resource] = createResource(resource, request, options, factory._callCount);

    return result;
  }, {});

  var resources = remapObjectPaths(Resources, ClientResourcePaths),
      clientOptions = { request: request, resources: resources },
      client = new Client(factory._callCount, clientOptions);

  factory._callCount++; // for memoize in resource factory calls

  return client;
}

// call count is used to memoize resource factory calls
factory._callCount = 0;

Object.assign(factory, {
  ClientResourcePaths: ClientResourcePaths,
  RequiredResources: RequiredResources,
  start: start
});

Object.assign(factory, Enum);

module.exports = factory;