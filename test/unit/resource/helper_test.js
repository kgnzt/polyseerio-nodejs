'use strict';

const should = require('should'),
      sinon = require('sinon'),
      proxyquire = require('proxyquire');

describe('Helper', () => {
  function getResponse () {
    return {
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
    };
  }

  function getResourceCollectionResponse () {
    return {
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

    it('returns true when data in response', () => {
      const response = {
        data: {}
      };

      const result = isResourceResponse(response);

      result.should.eql(true);
    });

    it('returns false when data not is passed', () => {
      const response = {
        foo: 'bar'
      };

      const result = isResourceResponse(response);

      result.should.eql(false);
    });
  });

  describe('parseResourceResponse', () => {
    const { parseResourceResponse } = Helper;

    it('handles a resource collection', () => {
      const response = getResourceCollectionResponse();

      factoryDouble.withArgs(response.data[0].type).returns(ResourceDouble);

      const result = parseResourceResponse(response);

      result.should.be.an.instanceOf(Array);
    });

    it('when a collection each item is an instance of factory result', () => {
      const response = getResourceCollectionResponse();

      factoryDouble.withArgs(response.data[0].type).returns(ResourceDouble);

      const result = parseResourceResponse(response);

      result.forEach(instance => {
        instance.should.be.an.instanceOf(ResourceDouble);
      });
    });

    it('handles a single resource', () => {
      const response = getResponse();

      factoryDouble.withArgs(response.data.type).returns(ResourceDouble);

      const result = parseResourceResponse(response);

      result.should.be.an.instanceOf(ResourceDouble);
    });
  });

  describe('parseResponse', () => {
    const { parseResponse } = Helper;

    describe('when a resource based response', () => {
      it('returns BaseResource instances', () => {
        const response = getResponse();

        factoryDouble.withArgs(response.data.type).returns(ResourceDouble);

        const result = parseResponse(response);

        result.should.be.an.instanceOf(ResourceDouble);
      });
    });

    describe('when not a resource based response', () => {
      it('returns the response object', () => {
        const response = {
          foo: 'bar'
        };

        const result = parseResponse(response);

        result.should.eql(response);
      });
    });
  });
});
