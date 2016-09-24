'use strict';

const sinon = require('sinon');

function createSDKHelperDouble () {
  return {
    resolveEid: sinon.stub(),
    forward: sinon.stub(),
    getResourcePath: sinon.stub()
  };
}

function resetSDKHelperDouble (helper) {
  helper.resolveEid.reset();
  helper.forward.reset();
  helper.getResourcePath.reset();
}

function createRequestMock () {
  return {
    del: sinon.stub(),
    delete: sinon.stub(),
    get: sinon.stub(),
    path: sinon.stub(),
    post: sinon.stub(),
    put: sinon.stub()
  };
}

const resourceDouble = 'foo';

module.exports = {
  resourceDouble,
  createRequestMock,
  createSDKHelperDouble,
  resetSDKHelperDouble
};
