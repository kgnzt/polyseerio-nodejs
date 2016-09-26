'use strict';

const should = require('should'),
      proxyquire = require('proxyquire');

describe('Method: remove', () => {
  const { resourceDouble,
          createRequestMock,
          createSDKHelperDouble,
          resetSDKHelperDouble } = require('./helper'),
        helperDouble = createSDKHelperDouble();
  
  const generator = proxyquire('../../../lib/sdk/static/remove', {
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
        remove = null;

    beforeEach(() => {
      request = createRequestMock();
      remove = generator(request, resourceDouble, {});
      resetSDKHelperDouble(helperDouble);
    });

    it('makes the correct call to del', () => {
      const id = 'omega',
            options = {},
            result = 'foo';

      helperDouble.resolveEid.returns('zing');
      helperDouble.getResourcePath.withArgs(resourceDouble, {
        id,
        eid: 'zing'
      }).returns('/foo/omega');
      request.del.returns(global.Promise.resolve(result));

      return remove(id, options).
        then(_ => {
          request.del.calledWithExactly({
            uri: '/foo/omega'
          }).should.eql(true);
        });
    });

    it('resolves when del resolves', () => {
      const id = 'omega',
            options = {},
            result = 'foo';

      request.del.returns(global.Promise.resolve(result));

      return remove(id, options).should.be.fulfilled(result);
    });

    it('rejects when del rejects', () => {
      const id = 'omega',
            options = {},
            error = new Error('foo');

      request.del.returns(global.Promise.reject(error));

      return remove(id, options).should.be.rejectedWith(error);
    });
  });
});
