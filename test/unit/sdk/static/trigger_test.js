'use strict';

const should     = require('should'),
      proxyquire = require('proxyquire');

describe('Static: trigger', () => {
  const { getCurryDefaults,
          createSDKHelperDouble,
          resetSDKHelperDouble } = require('./helper'),
        helperDouble = createSDKHelperDouble();
  
  const trigger = proxyquire('../../../../lib/sdk/static/trigger', {
    '../helper': helperDouble
  });

  before(() => resetSDKHelperDouble(helperDouble));

  it('makes the correct call to post', () => {
    const { request,
            resource,
            copts } = getCurryDefaults(),
          id = 'omega',
          payload = {a:'b'},
          options = {},
          result = 'foo';

    helperDouble.resolveEid.returns('zing');
    helperDouble.getResourcePath.withArgs(resource, {
      id,
      eid: 'zing'
    }).returns('/foo/omega');
    request.post.returns(global.Promise.resolve(result));

    return trigger(request, resource, copts, id, payload, options).
      then(_ => {
        request.post.calledWithExactly({
          uri: '/foo/omega/trigger',
          body: {
            meta: payload
          }
        }).should.eql(true);
      });
  });

  it('resolves when post resolves', () => {
    const { request,
            resource,
            copts } = getCurryDefaults(),
          id = 'omega',
          payload = {a:'b'},
          options = {},
          result = 'foo';

    request.post.returns(global.Promise.resolve(result));

    return trigger(request, resource, copts, id, payload, options).should.be.fulfilled(result);
  });

  it('rejects when post rejects', () => {
    const { request,
            resource,
            copts } = getCurryDefaults(),
          id = 'omega',
          payload = {a:'b'},
          options = {},
          error = new Error('foo');

    request.post.returns(global.Promise.reject(error));

    return trigger(request, resource, copts, id, payload, options).should.be.rejectedWith(error);
  });
});
