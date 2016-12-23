'use strict';

const should = require('should'),
      sinon = require('sinon'),
      proxyquire = require('proxyquire');

describe('Helper', () => {
  function getResponse () {
    return {
      client: {
        _httpMessage: {
          path: '/v1/something',
        }
      },
      body: {
        data: {
          id: 1,
          type: 'foo',
          attributes: {
            ding: 'dong'
          },
          relationships: {
            king: 'kong'
          }
        },
        meta: {
          alpha: 'beta'
        }
      }
    };
  }

  function getResourceCollectionResponse () {
    return {
      client: {
        _httpMessage: {
          path: '/v1/something',
        }
      },
      body: {
        data: [{
          id: 1,
          type: 'foo',
          attributes: {
            ding: 'dong'
          },
          relationships: {
            king: 'kong'
          }
        }, {
          id: 2,
          type: 'foo',
          attributes: {
            ding: 'wing'
          },
          relationships: {
            king: 'hello'
          }
        }],
        meta: {
          alpha: 'beta'
        }
      }
    };
  }

  const factoryDouble = sinon.stub();

  class ResourceDouble {}

  const Helper = proxyquire('../../../lib/resource/helper', {
    './factory': factoryDouble
  });

  beforeEach(() => {
    factoryDouble.reset();
  });

  describe('getEidFromRequestPath', () => {
    const { getEidFromRequestPath } = Helper;

    it('returns correct eid when longer path used', () => {
      const path = '/v1/environments/development/instances/10000/gauges';

      const result = getEidFromRequestPath(path);

      result.should.eql('development');
    });

    it('returns null when non resource path provided', () => {
      const path = '/v1/something';

      const result = getEidFromRequestPath(path);

      (result === null).should.eql(true);
    });

    it('returns correct eid when available', () => {
      const path = '/polyseer/v1/environments/validation-testing/events';

      const result = getEidFromRequestPath(path);

      result.should.eql('validation-testing');
    });

    it('returns null is non could be found', () => {
      const path = '/polyseer/v1/members';

      const result = getEidFromRequestPath(path);

      (result === null).should.eql(true);
    });

    it('returns the eid when using environment w/ name', () => {
      const path = '/environments/name/validation-testing';

      const result = getEidFromRequestPath(path);

      result.should.eql('validation-testing');
    });
  });

  describe('isResourceCollection', () => {
    const { isResourceCollection } = Helper;

    it('returns true when array is passed', () => {
      const data = [];

      const result = isResourceCollection(data);

      result.should.eql(true);
    });

    it('returns false when object is passed', () => {
      const data = {};

      const result = isResourceCollection(data);

      result.should.eql(false);
    });
  });

  describe('isResourceResponse', () => {
    const { isResourceResponse } = Helper;

    it('returns true when body has data', () => {
      const response = {
        body: {
          data: {}
        }
      };

      const result = isResourceResponse(response);

      result.should.eql(true);
    });

    it('returns false when body has no data', () => {
      const response = {
        body: {
          dork: 'a'
        }
      };

      const result = isResourceResponse(response);

      result.should.eql(false);
    });

    it('returns false when body.data is not an array or object', () => {
      const response = {
        body: {
          data: 'do'
        }
      };

      const result = isResourceResponse(response);

      result.should.eql(false);
    });
  });

  describe('parseResourceResponse', () => {
    const { parseResourceResponse } = Helper;

    it('handles a resource collection', () => {
      const response = getResourceCollectionResponse();

      factoryDouble.withArgs(response.body.data[0].type).returns(ResourceDouble);

      const result = parseResourceResponse(response);

      result.should.be.an.instanceOf(Array);
    });

    it('when a collection each item is an instance of factory result', () => {
      const response = getResourceCollectionResponse();

      factoryDouble.withArgs(response.body.data[0].type).returns(ResourceDouble);

      const result = parseResourceResponse(response);

      result.forEach(instance => {
        instance.should.be.an.instanceOf(ResourceDouble);
      });
    });

    it('handles a single resource', () => {
      const response = getResponse();

      factoryDouble.withArgs(response.body.data.type).returns(ResourceDouble);

      const result = parseResourceResponse(response);

      result.should.be.an.instanceOf(ResourceDouble);
    });
  });

  describe('parseResponse', () => {
    const { parseResponse } = Helper;

    describe('when a resource based response', () => {
      it('returns BaseResource instances', () => {
        const response = getResponse();

        factoryDouble.withArgs(response.body.data.type).returns(ResourceDouble);

        const result = parseResponse(response);

        result.should.be.an.instanceOf(ResourceDouble);
      });
    });

    describe('when not a resource based response', () => {
      it('returns the response object', () => {
        const response = {
          body: {
            foo: 'bar'
          }
        };

        const result = parseResponse(response);

        result.should.eql(response);
      });
    });
  });
});
