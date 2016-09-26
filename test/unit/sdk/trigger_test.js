'use strict';

const should = require('should'),
      proxyquire = require('proxyquire');

describe('Method: trigger', () => {
  const { resourceDouble,
          createRequestMock,
          createSDKHelperDouble,
          resetSDKHelperDouble } = require('./helper'),
        helperDouble = createSDKHelperDouble();
  
  const generator = proxyquire('../../../lib/sdk/static/trigger', {
    '../helper': helperDouble
  });

  describe('generator', () => {
    it('returns a function', () => {
      const method = generator();

      (typeof method).should.eql('function');
    });
  });

  describe('function call', () => {
    let request = null,
        trigger = null;

    beforeEach(() => {
      request = createRequestMock();
      trigger = generator(request, resourceDouble, {});
      resetSDKHelperDouble(helperDouble);
    });

    it('makes the correct call to post', () => {
      const id = 'omega',
            payload = {a:'b'},
            options = {},
            result = 'foo';

      helperDouble.resolveEid.returns('zing');
      helperDouble.getResourcePath.withArgs(resourceDouble, {
        id,
        eid: 'zing'
      }).returns('/foo/omega');
      request.post.returns(global.Promise.resolve(result));

      return trigger(id, payload, options).
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
      const id = 'omega',
            payload = {a:'b'},
            options = {},
            result = 'foo';

      request.post.returns(global.Promise.resolve(result));

      return trigger(id, payload, options).should.be.fulfilled(result);
    });

    it('rejects when post rejects', () => {
      const id = 'omega',
            payload = {a:'b'},
            options = {},
            error = new Error('foo');

      request.post.returns(global.Promise.reject(error));

      return trigger(id, payload, options).should.be.rejectedWith(error);
    });
  });
});
