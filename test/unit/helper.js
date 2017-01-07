'use strict';

const sinon  = require('sinon'),
      lodash = require('lodash');

/**
 * Returns a request mock.
 *
 * @return {sinon.stub}
 */
function createRequestMock () {
  return {
    post: sinon.stub(),
    put: sinon.stub(),
    del: sinon.stub(),
    delete: sinon.stub(),
    get: sinon.stub()
  };
}

/**
 * Create a mock instance.
 *
 * @param {object}
 * @return {object}
 */
function createInstance (attributes = {}) {
  const mock = {
    _attributes: Object.assign({}, attributes),
    get: sinon.stub(),
    set: sinon.stub()
  };

  lodash.forEach(attributes, (value, key) => {
    mock.get.withArgs(key).returns(value);
  });

  return mock;
}

module.exports = {
  createInstance,
  createRequestMock
};
