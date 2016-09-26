'use strict';

const should = require('should'),
      proxyquire = require('proxyquire');

describe('Method: update', () => {
  const { resourceDouble,
          createRequestMock,
          createSDKHelperDouble,
          resetSDKHelperDouble } = require('./helper'),
        helperDouble = createSDKHelperDouble();
  
  const generator = proxyquire('../../../lib/sdk/static/update', {
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
        update = null;

    beforeEach(() => {
      request = createRequestMock();
      update = generator(request, resourceDouble, {});
      resetSDKHelperDouble(helperDouble);
    });

    it('makes the correct call to put', () => {
      const id = 'bar',
            updates = {
              alpha: 'beta',
            },
            options = {
              ding: 'dong'
            },
            result = 'foo';

      helperDouble.resolveEid.returns('zing');
      helperDouble.getResourcePath.withArgs(resourceDouble, {
        id,
        eid: 'zing'
      }).returns('/foo/bar');
      request.put.returns(global.Promise.resolve(result));

      return update(id, updates, options).
        then(_ => {
          request.put.calledWithExactly({
            uri: '/foo/bar',
            body: updates
          }).should.eql(true);
        });
    });

    it('resolves when put resolves', () => {
      const id = 'bar',
            options = {},
            result = 'foo';

      request.put.returns(global.Promise.resolve(result));

      return update(id, options).should.be.fulfilled(result);
    });

    it('rejects when put rejects', () => {
      const id = 'bar',
            options = {},
            error = new Error('foo');

      request.put.returns(global.Promise.reject(error));

      return update(id, options).should.be.rejectedWith(error);
    });
  });
});
