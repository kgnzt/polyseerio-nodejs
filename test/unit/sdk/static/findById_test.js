'use strict';

const should = require('should'),
      proxyquire = require('proxyquire');

describe('Static: findById', () => {
  const { getCurryDefaults,
          createSDKHelperDouble,
          resetSDKHelperDouble } = require('./helper'),
        helperDouble = createSDKHelperDouble();
  
  const findById = proxyquire('../../../../lib/sdk/static/findById', {
    '../helper': helperDouble
  });

  before(() => resetSDKHelperDouble(helperDouble));

  it('makes the correct call to get', () => {
    const { request,
            resource,
            copts } = getCurryDefaults(),
          id = 'bar',
          options = {},
          result = 'foo';

    helperDouble.resolveEid.returns('zing');
    helperDouble.getResourcePath.withArgs(resource, {
      id,
      eid: 'zing'
    }).returns('/foo/bar');
    request.get.returns(global.Promise.resolve(result));

    return findById(request, resource, copts, id, options).
      then(_ => {
        request.get.calledWithExactly({
          uri: '/foo/bar'
        }).should.eql(true);
      });
  });

  it('resolves when get resolves', () => {
    const { request,
            resource,
            copts } = getCurryDefaults(),
          id = 'bar',
          options = {},
          result = 'foo';

    request.get.returns(global.Promise.resolve(result));

    return findById(request, resource, copts, id, options).should.be.fulfilled(result);
  });

  it('rejects when get rejects', () => {
    const { request,
            resource,
            copts } = getCurryDefaults(),
          id = 'bar',
          options = {},
          error = new Error('foo');

    request.get.returns(global.Promise.reject(error));

    return findById(request, resource, copts, id, options).should.be.rejectedWith(error);
  });
});
