'use strict';

const should = require('should'),
      proxyquire = require('proxyquire');

describe('Method: findById', () => {
  const { resourceDouble,
          createRequestMock,
          createSDKHelperDouble,
          resetSDKHelperDouble } = require('./helper'),
        helperDouble = createSDKHelperDouble();
  
  const generator = proxyquire('../../../lib/sdk/static/findById', {
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
        findById = null;

    beforeEach(() => {
      request = createRequestMock();
      findById = generator(request, resourceDouble, {});
      resetSDKHelperDouble(helperDouble);
    });

    it('makes the correct call to get', () => {
      const id = 'bar',
            options = {},
            result = 'foo';

      helperDouble.resolveEid.returns('zing');
      helperDouble.getResourcePath.withArgs(resourceDouble, {
        id,
        eid: 'zing'
      }).returns('/foo/bar');
      request.get.returns(global.Promise.resolve(result));

      return findById(id, options).
        then(_ => {
          request.get.calledWithExactly({
            uri: '/foo/bar'
          }).should.eql(true);
        });
    });

    it('resolves when get resolves', () => {
      const id = 'bar',
            options = {},
            result = 'foo';

      request.get.returns(global.Promise.resolve(result));

      return findById(id, options).should.be.fulfilled(result);
    });

    it('rejects when get rejects', () => {
      const id = 'bar',
            options = {},
            error = new Error('foo');

      request.get.returns(global.Promise.reject(error));

      return findById(id, options).should.be.rejectedWith(error);
    });
  });
});
