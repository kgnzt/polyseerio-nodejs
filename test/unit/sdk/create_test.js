'use strict';

const should = require('should'),
      proxyquire = require('proxyquire');

describe('Method: create', () => {
  const { resourceDouble,
          createRequestMock,
          createSDKHelperDouble,
          resetSDKHelperDouble } = require('./helper'),
        helperDouble = createSDKHelperDouble();
  
  const generator = proxyquire('../../../lib/sdk/static/create', {
    '../helper': helperDouble
  });

  describe('generator', () => {
    it('returns a function', () => {
      const method = generator();

      (typeof method).should.eql('function');
    });
  });

  describe('function all', () => {
    let request = null,
        create = null;

    beforeEach(() => {
      request = createRequestMock();
      create = generator(request, resourceDouble);
      resetSDKHelperDouble(helperDouble);
    });

    it('makes the correct call to post', () => {
      const attributes = {
              name: 'foo',
              age: 13
            },
            options = {},
            result = 'foo';

      helperDouble.resolveEid.returns('zing');
      helperDouble.getResourcePath.withArgs(resourceDouble, {
        eid: 'zing'
      }).returns('/foo');
      request.post.returns(global.Promise.resolve(result));

      return create(attributes, options).
        then(_ => {
          request.post.calledWithExactly({
            uri: '/foo',
            body: attributes
          }).should.eql(true);
        });
    });

    it('resolves when post resolves', () => {
      const attributes = {
              name: 'foo'
            },
            options = {},
            result = 'foo';

      request.post.returns(global.Promise.resolve(result));

      return create(attributes, options).should.be.fulfilled(result);
    });

    it('rejects when post rejects', () => {
      const attributes = {
              name: 'foo'
            },
            options = {},
            error = new Error('foo');

      request.post.returns(global.Promise.reject(error));

      return create(attributes, options).should.be.rejectedWith(error);
    });
  });
});
