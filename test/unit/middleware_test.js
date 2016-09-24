'use strict';

const should = require('should'),
      proxyquire = require('proxyquire'),
      sinon = require('sinon');

describe('Middleware', () => {
  const formatPayloadDouble = sinon.stub(),
        parseResponseDouble = sinon.stub();

  const Middleware = proxyquire('../../lib/middleware', {
    './helper': {
      formatPayload: formatPayloadDouble
    },
    './resource/helper': {
      parseResponse: parseResponseDouble
    }
  });

  beforeEach(() => {
    formatPayloadDouble.reset();
  });

  describe('forwardCurry', () => {
    const { forwardCurry } = Middleware;

    it('can curry one argument to passed function', () => {
      const func = function (a) { return arguments; };

      const curry = forwardCurry(func, 'dos'),
            result = curry('uno');

      result[0].should.eql('uno');
      result[1].should.eql('dos');
    });

    it('can curry two arguments to passed function', () => {
      const func = function (a) { return arguments; };

      const curry = forwardCurry(func, 'dos', 'tres'),
            result = curry('uno');

      result[0].should.eql('uno');
      result[1].should.eql('dos');
      result[2].should.eql('tres');
    });
  });

  describe('preRequest', () => {
    const { preRequest } = Middleware;

    it('returns identity if no body', () => {
      const options = {
        foo: 'bar'
      };

      const result = preRequest(options);

      result.should.eql(options);
    });

    it('calls formatPayload if body in optinos', () => {
      const options = {
        body: {
          alpha: 'beta'
        },
        ding: 'dong'
      };

      formatPayloadDouble.returns('result');

      const result = preRequest(options);

      result.should.eql({
        body: 'result',
        ding: 'dong'
      });
    });
  });

  describe('postRequest', () => {
    const { postRequest } = Middleware;

    it('returns the result of parseResponse', () => {
      parseResponseDouble.returns('foo');

      const result = postRequest('alpha');

      parseResponseDouble.calledWithExactly('alpha');
      result.should.eql('foo');
    });
  });
});
