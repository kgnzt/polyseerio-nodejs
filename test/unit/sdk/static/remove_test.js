'use strict';

const should     = require('should'),
      proxyquire = require('proxyquire');

describe('Static: remove', () => {
  const { getCurryDefaults,
          createSDKHelperDouble,
          resetSDKHelperDouble } = require('./helper'),
        helperDouble = createSDKHelperDouble();
  
  const remove = proxyquire('../../../../lib/sdk/static/remove', {
    '../helper': helperDouble
  });

  before(() => resetSDKHelperDouble(helperDouble));

  it('makes the correct call to del', () => {
    const { request,
            resource,
            copts } = getCurryDefaults(),
          id = 'omega',
          options = {},
          result = 'foo';

    helperDouble.resolveEid.returns('zing');
    helperDouble.getResourcePath.withArgs(resource, {
      id,
      eid: 'zing'
    }).returns('/foo/omega');
    request.del.returns(global.Promise.resolve(result));

    return remove(request, resource, copts, id, options).
      then(_ => {
        request.del.calledWithExactly({
          uri: '/foo/omega'
        }).should.eql(true);
      });
  });

  it('resolves when del resolves', () => {
    const { request,
            resource,
            copts } = getCurryDefaults(),
          id = 'omega',
          options = {},
          result = 'foo';

    request.del.returns(global.Promise.resolve(result));

    return remove(request, resource, copts, id, options).should.be.fulfilled(result);
  });

  it('rejects when del rejects', () => {
    const { request,
            resource,
            copts } = getCurryDefaults(),
          id = 'omega',
          options = {},
          error = new Error('foo');

    request.del.returns(global.Promise.reject(error));

    return remove(request, resource, copts, id, options).should.be.rejectedWith(error);
  });
});
