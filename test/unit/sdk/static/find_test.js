'use strict';

const should     = require('should'),
      proxyquire = require('proxyquire');

describe('Static: find', () => {
  const { getCurryDefaults,
          createSDKHelperDouble,
          resetSDKHelperDouble } = require('./helper'),
        helperDouble = createSDKHelperDouble();
  
  const find = proxyquire('../../../../lib/sdk/static/find', {
    '../helper': helperDouble
  });

  before(() => resetSDKHelperDouble(helperDouble));

  it('makes the correct call to get', () => {
    const { request,
            resource,
            copts } = getCurryDefaults(),
          qs = {
            limit: 2
          },
          options = {},
          result = 'foo';

    helperDouble.resolveEid.returns('zing');
    helperDouble.getResourcePath.withArgs(resource, {
      eid: 'zing'
    }).returns('/foo');
    request.get.returns(global.Promise.resolve(result));

    return find(request, resource, copts, qs, options).
      then(_ => {
        request.get.calledWithExactly({
          qs,
          uri: '/foo'
        }).should.eql(true);
      });
  });

  it('resolves when get resolves', () => {
    const { request,
            resource,
            copts } = getCurryDefaults(),
          qs = {
            limit: 2
          },
          options = {},
          result = 'foo';

    request.get.returns(global.Promise.resolve(result));

    return find(request, resource, copts, qs, options).should.be.fulfilled(result);
  });

  it('rejects when get rejects', () => {
    const { request,
            resource,
            copts } = getCurryDefaults(),
          qs = {
            limit: 2
          },
          options = {},
          error = new Error('foo');

    request.get.returns(global.Promise.reject(error));

    return find(request, resource, copts, qs, options).should.be.rejectedWith(error);
  });
});
