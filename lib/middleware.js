'use strict';

const lodash                    = require('lodash'),
      requestPromise            = require('request-promise'),
      { formatPayload }         = require('./helper'),
      { getEidFromRequestPath,
        parseResponse }         = require('./resource/helper');

/**
 * Retrty a failed request.
 *
 * @return {Promise}
 */
function retryRequest (request, failed, cid, payload = {}) {
  const uri = failed.path.split('polyseer/v1/')[1];

  return request({
    method: failed.method,
    uri,
    body: payload
  }).then(response => {
    return parseResponse(response, cid);
  });
}

/**
 * Creates the missing environment.
 *
 * @param {request}
 * @return {Promise}
 */
function upsertEnvironment (request, name) {
  return request.post({
    uri: '/environments',
    body: formatPayload({
      name,
      description: 'Environment created by agent upsert.'
    })
  });
}

/**
 * Determine if a request was rejected due to a missing 
 * environment.
 *
 * @param {request}
 * @return {Promise}
 */
function rejectedDueToMissingEnvironment (error) {
  if (error.name !== 'StatusCodeError') {
    return false;
  }

  if (error.statusCode !== 404) {
    return false;
  }

  if (!lodash.has(error.error, 'errors') || !lodash.isArray(error.error.errors)) {
    return false;
  }

  return lodash.some(error.error.errors, err => {
    return (err.status === 404 && err.detail.indexOf('Could not find') !== -1);
  });
}

/**
 * Used to curry client options along to middleware.
 *
 * @param {function}
 * @param {object}
 * @return {function}
 */
function forwardCurry () {
  const params = Array.prototype.slice.call(arguments),
        func = params.shift();

  return function () {
    return func(...arguments, ...params);
  };
}

/**
 * Called before a request is made.
 *
 * @param {object}
 * @param {number}
 * @return {object}
 */
function preRequest (options, cid) {
  if ('body' in options) {
    options.body = formatPayload(options.body);
  }

  return options;
}

/**
 * Called after a request is made.
 *
 * @param {object}
 * @param {number}
 * @return {Mixed}
 */
function postRequest (response, cid) {
  return parseResponse(response, cid);
}

/**
 * Called after a request is rejected.
 *
 * @param {object}
 * @param {number}
 * @return {Mixed}
 */
function postReject (error, cid, request) {
  // if we have an error with a response that is not nil.
  if (lodash.has(error, 'response') && !lodash.isNil(error.response)) {
    let originalPayload = {};

    if (error.response.request.body) {
      originalPayload = JSON.parse(error.response.request.body); // becomes undefined (tick issue)
    }
  
    const isMissingEnvironment = rejectedDueToMissingEnvironment(error);
  
    if (isMissingEnvironment) {
      const failedRequest = error.response.req,
            name = getEidFromRequestPath(failedRequest.path);
  
      return upsertEnvironment(request, name).
        then(_ => {
          return retryRequest(request, failedRequest, cid, originalPayload);
        });
    }
  }

  return global.Promise.reject(error);
}

module.exports = {
  forwardCurry,
  preRequest,
  postRequest,
  postReject
};
