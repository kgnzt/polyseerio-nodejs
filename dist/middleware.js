'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var lodash = require('lodash'),
    requestPromise = require('request-promise'),
    _require = require('./helper'),
    formatPayload = _require.formatPayload,
    _require2 = require('./resource/helper'),
    getEidFromRequestPath = _require2.getEidFromRequestPath,
    parseResponse = _require2.parseResponse;

/**
 * Retrty a failed request.
 *
 * @return {Promise}
 */
function retryRequest(request, failed, cid) {
  var payload = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var uri = failed.path.split('polyseer/v1/')[1];

  return request({
    method: failed.method,
    uri: uri,
    body: payload
  }).then(function (response) {
    return parseResponse(response, cid);
  });
}

/**
 * Creates the missing environment.
 *
 * @param {request}
 * @return {Promise}
 */
function upsertEnvironment(request, name) {
  return request.post({
    uri: '/environments',
    body: formatPayload({
      name: name,
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
function rejectedDueToMissingEnvironment(error) {
  if (error.name !== 'StatusCodeError') {
    return false;
  }

  if (error.statusCode !== 404) {
    return false;
  }

  if (!lodash.has(error.error, 'errors') || !lodash.isArray(error.error.errors)) {
    return false;
  }

  return lodash.some(error.error.errors, function (err) {
    return err.status === 404 && err.detail.indexOf('Could not find') !== -1 && err.detail.indexOf('environment') !== -1;
  });
}

/**
 * Used to curry client options along to middleware.
 *
 * @param {function}
 * @param {object}
 * @return {function}
 */
function forwardCurry() {
  var params = Array.prototype.slice.call(arguments),
      func = params.shift();

  return function () {
    return func.apply(undefined, Array.prototype.slice.call(arguments).concat(_toConsumableArray(params)));
  };
}

/**
 * Called before a request is made.
 *
 * @param {object}
 * @param {number}
 * @return {object}
 */
function preRequest(options, cid) {
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
function postRequest(response, cid) {
  return parseResponse(response, cid);
}

/**
 * Called after a request is rejected.
 *
 * @param {object}
 * @param {number}
 * @return {Mixed}
 */
function postReject(error, cid, request) {
  var copts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  // if we have an error with a response that is not nil.
  if (lodash.has(error, 'response') && !lodash.isNil(error.response)) {
    if (copts.upsert_env) {
      var _ret = function () {
        var originalPayload = {};

        if (error.response.request.body) {
          originalPayload = JSON.parse(error.response.request.body); // becomes undefined (tick issue)
        }

        var isMissingEnvironment = rejectedDueToMissingEnvironment(error);

        if (isMissingEnvironment) {
          var _ret2 = function () {
            var failedRequest = error.response.req,
                name = getEidFromRequestPath(failedRequest.path);

            return {
              v: {
                v: upsertEnvironment(request, name).then(function (_) {
                  return retryRequest(request, failedRequest, cid, originalPayload);
                })
              }
            };
          }();

          if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
        }
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
  }

  return global.Promise.reject(error);
}

module.exports = {
  forwardCurry: forwardCurry,
  preRequest: preRequest,
  postRequest: postRequest,
  postReject: postReject
};