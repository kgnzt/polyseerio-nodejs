'use strict';

const sinon  = require('sinon'),
      lodash = require('lodash');

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
  createInstance
};
