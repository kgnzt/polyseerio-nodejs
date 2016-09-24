'use strict';

const should = require('should'),
      proxyquire = require('proxyquire');

describe('Method: find', () => {
  const { resourceDouble,
          createRequestMock,
          createSDKHelperDouble,
          resetSDKHelperDouble } = require('./helper'),
        helperDouble = createSDKHelperDouble();

  const generator = proxyquire('../../../lib/sdk/static/find', {
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
        find = null;

    beforeEach(() => {
      request = createRequestMock();
      find = generator(request, resourceDouble);
      resetSDKHelperDouble(helperDouble);
    });

    it('makes the correct call to get', () => {
      const qs = {
              limit: 2
            },
            options = {},
            result = 'foo';

      helperDouble.resolveEid.returns('zing');
      helperDouble.getResourcePath.withArgs(resourceDouble, {
        eid: 'zing'
      }).returns('/foo');
      request.get.returns(global.Promise.resolve(result));

      return find(qs, options).
        then(_ => {
          request.get.calledWithExactly({
            qs,
            uri: '/foo'
          }).should.eql(true);
        });
    });

    it('resolves when get resolves', () => {
      const qs = {
              limit: 2
            },
            options = {},
            result = 'foo';

      request.get.returns(global.Promise.resolve(result));

      return find(qs, options).should.be.fulfilled(result);
    });

    it('rejects when get rejects', () => {
      const qs = {
              limit: 2
            },
            options = {},
            error = new Error('foo');

      request.get.returns(global.Promise.reject(error));

      return find(qs, options).should.be.rejectedWith(error);
    });
  });
});
