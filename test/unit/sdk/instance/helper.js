'use strict';

const sinon = require('sinon');

function createRequestMock () {
  return {
    post: sinon.stub(),
    del: sinon.stub(),
    get: sinon.stub(),
    put: sinon.stub(),
    patch: sinon.stub()
  };
}

module.exports = {
  createRequestMock
};
