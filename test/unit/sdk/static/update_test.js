'use strict';

const should     = require('should'),
      proxyquire = require('proxyquire');

describe('Static: update', () => {
  const { getCurryDefaults,
          createSDKHelperDouble,
          resetSDKHelperDouble } = require('./helper'),
        helperDouble = createSDKHelperDouble();
  
  const update = proxyquire('../../../../lib/sdk/static/update', {
    '../helper': helperDouble
  });

  before(() => resetSDKHelperDouble(helperDouble));

  it('makes the correct call to put', () => {
    const { request,
            resource,
            copts } = getCurryDefaults(),
          id = 'bar',
          updates = {
            alpha: 'beta',
          },
          options = {
            ding: 'dong'
          },
          result = 'foo';

    helperDouble.resolveEid.returns('zing');
    helperDouble.getResourcePath.withArgs(resource, {
      id,
      eid: 'zing'
    }).returns('/foo/bar');
    request.put.returns(global.Promise.resolve(result));

    return update(request, resource, copts, id, updates, options).
      then(_ => {
        request.put.calledWithExactly({
          uri: '/foo/bar',
          body: updates
        }).should.eql(true);
      });
  });

  it('resolves when put resolves', () => {
    const { request,
            resource,
            copts } = getCurryDefaults(),
          id = 'bar',
          options = {},
          result = 'foo';

    request.put.returns(global.Promise.resolve(result));

    return update(request, resource, copts, id, options).should.be.fulfilled(result);
  });

  it('rejects when put rejects', () => {
    const { request,
            resource,
            copts } = getCurryDefaults(),
          id = 'bar',
          options = {},
          error = new Error('foo');

    request.put.returns(global.Promise.reject(error));

    return update(request, resource, copts, id, options).should.be.rejectedWith(error);
  });
});
