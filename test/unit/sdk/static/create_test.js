'use strict';

const should     = require('should'),
      proxyquire = require('proxyquire');

describe('Static: create', () => {
  const { getCurryDefaults,
          createSDKHelperDouble,
          resetSDKHelperDouble } = require('./helper'),
        helperDouble = createSDKHelperDouble();
  
  const create = proxyquire('../../../../lib/sdk/static/create', {
    '../helper': helperDouble
  });

  before(() => resetSDKHelperDouble(helperDouble));

  it('makes the correct call to post', () => {
    const { request,
            resource,
            copts } = getCurryDefaults(),
          attributes = {
            name: 'foo',
            age: 13
          },
          options = {},
          result = 'foo';

    helperDouble.resolveEid.returns('zing');
    helperDouble.getResourcePath.withArgs(resource, {
      eid: 'zing'
    }).returns('/foo');
    request.post.returns(global.Promise.resolve(result));

    return create(request, resource, copts, attributes, options).
      then(_ => {
        request.post.calledWithExactly({
          uri: '/foo',
          body: attributes
        }).should.eql(true);
      });
  });

  it('resolves when post resolves', () => {
    const { request,
            resource,
            copts } = getCurryDefaults(),
          attributes = {
            name: 'foo'
          },
          options = {},
          result = 'foo';

    request.post.returns(global.Promise.resolve(result));

    return create(request, resource, copts, attributes, options).
      should.be.fulfilled(result);
  });

  it('rejects when post rejects', () => {
    const { request,
            resource,
            copts } = getCurryDefaults(),
          attributes = {
            name: 'foo'
          },
          options = {},
          error = new Error('foo');

    request.post.returns(global.Promise.reject(error));

    return create(request, resource, copts, attributes, options).should.be.rejectedWith(error);
  });
});
