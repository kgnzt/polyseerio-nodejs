'use strict';

const should = require('should'),
      sinon = require('sinon'),
      proxyquire = require('proxyquire');

describe('SDK Factory', () => {
  const StaticDouble = {
          foo: function (a, b, c, d) { return [a, b, c, d]; },
          bar: function (a, b, c, d) { return [a, b, c, d]; }
        },
        InstanceDouble = {
          ping: sinon.stub(),
          pong: sinon.stub(),
        };

  const factory = proxyquire('../../lib/sdk/factory', {
    './static': StaticDouble,
    './method': InstanceDouble
  });

  beforeEach(() => {
    InstanceDouble.ping.reset();
    InstanceDouble.pong.reset();
  });

  describe('staticFactory', () => {
    const { staticFactory } = factory;

    it('returns requested static methods', () => {
      const request = sinon.spy(),
            resource = 'alpha',
            statics = ['foo', 'bar'];

      const response = staticFactory(request, resource, statics);

      response.should.have.property('foo');
      response.should.have.property('bar');
    });

    it('', () => {
      // TODO: ensure that preprocessing occurs.
    });

    it('throws if the requested static does not exist', () => {
      const request = sinon.spy(),
            resource = 'alpha',
            statics = ['unknown'];

      (function () {
        staticFactory(request, resource, statics);
      }).should.throw(/asked to generate a 'unknown' static method/);
    });
  });

  describe('methodFactory', () => {
    const { methodFactory } = factory;

    it('returns requested methods', () => {
      const request = sinon.spy(),
            resource = 'alpha',
            statics = ['ping', 'pong'];

      const response = methodFactory(request, resource, statics);

      response.should.have.property('ping');
      response.should.have.property('pong');
    });

    it('returns result of called requested method', () => {
      const request = sinon.spy(),
            resource = 'alpha',
            statics = ['ping'];

      const response = methodFactory(request, resource, statics);

      response.ping.should.eql(InstanceDouble.ping);
    });

    it('throws if the requested method does not exist', () => {
      const request = sinon.spy(),
            resource = 'alpha',
            statics = ['unknown'];

      (function () {
        methodFactory(request, resource, statics);
      }).should.throw(/asked to generate a 'unknown' instance method/);
    });
  });
});
