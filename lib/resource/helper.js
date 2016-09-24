'use strict';

const factory = require('./factory'),
      lodash  = require('lodash');

/**
 * Determine if a response is a resource response.
 *
 * @param {object}
 * @return {boolean}
 */
function isResourceResponse (response) {
  return ('data' in response && 
    (lodash.isArray(response.data) || lodash.isPlainObject(response.data)));
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

/**
 * @param {object}
 * @return {Resource}
 */
function resourceToInstance (data, meta = {}, included = {}) {
  const type = data.type || null,
        id = data.id || null,
        attributes = data.attributes || {},
        relationships = data.relationships || {};

  attributes.id = id;
  attributes.resource = type;

  const Resource = factory(type);

  return new Resource(attributes, {
    meta,
    included
  });
}

/**
 * Parse a single resource.
 *
 * @param {string}
 * @param {object}
 * @param {object}
 * @param {object}
 */
function parseResourceResponse (response) {
  const meta = response.meta || {},
        included = response.included || {},
        { data } = response;

  if (isResourceCollection(data)) {
    return data.map(item => {
      return resourceToInstance(item, meta, included);
    });
  }
  
  return resourceToInstance(data, meta, included);
}

/**
 * Parse a response.
 *
 * @param {object} a response object
 * @param {object}
 * @throws {Error} when response does not indicate a resource / type.
 */
function parseResponse (response) {
  if (isResourceResponse(response)) {
    return parseResourceResponse(response);
  }

  return response;
}

module.exports = {
  parseResponse,
  parseResourceResponse,
  isResourceResponse,
  isResourceCollection,
  createResource: factory
};
