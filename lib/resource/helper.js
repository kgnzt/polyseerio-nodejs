'use strict';

const factory = require('./factory'),
      lodash  = require('lodash');

const EID_REGEX = /environments\/(.*)\//;

/**
 * Given a URI request path, an environment id is returned.
 *
 * @param {string}
 * @return {string||null}
 */
function getEidFromRequestPath (path) {
  const result = EID_REGEX.exec(path);

  if (!result || result.length < 2) {
    return null;
  }

  return result[1];
}

/**
 * Determine if a response is a resource response.
 *
 * @param {object}
 * @return {boolean}
 */
function isResourceResponse (response) {
  return ('data' in response.body && 
    (lodash.isArray(response.body.data) || lodash.isPlainObject(response.body.data)));
}

/**
 * Determine if response data is for a collection of resources.
 *
 * @param {object}
 * @return {boolean}
 */
function isResourceCollection (data) {
  return (lodash.isArray(data));
}

// TODO: move cid up
/**
 * @param {object}
 * @return {Resource}
 */
function resourceToInstance (data, meta = {}, included = {}, cid = null) {
  const type = data.type || null,
        id = data.id || null,
        attributes = data.attributes || {},
        relationships = data.relationships || {};

  attributes.id = id;
  attributes.resource = type;

  const Resource = factory(type, undefined, undefined, cid);

  return new Resource(attributes, {
    meta,
    included
  });
}

/**
 * Parse a single resource.
 *
 * @param {object}
 * @param {object}
 * @return {object}
 */
function parseResourceResponse (response, cid) {
  const { body } = response,
        path = response.client._httpMessage.path,
        meta = body.meta || {},
        included = body.included || {},
        { data } = body;

  const eid = getEidFromRequestPath(path);

  if ('attributes' in data) {
    data.attributes.eid = eid;
  }

  if (isResourceCollection(data)) {
    return data.map(item => {
      return resourceToInstance(item, meta, included, cid);
    });
  }
  
  return resourceToInstance(data, meta, included, cid);
}

/**
 * Parse a response.
 *
 * @param {object} a response object
 * @param {object}
 * @throws {Error} when response does not indicate a resource / type.
 */
function parseResponse (response, cid) {
  if (isResourceResponse(response)) {
    return parseResourceResponse(response, cid);
  }

  return response;
}

module.exports = {
  parseResponse,
  parseResourceResponse,
  getEidFromRequestPath,
  isResourceResponse,
  isResourceCollection,
  createResource: factory
};
