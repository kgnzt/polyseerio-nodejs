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
    './instance': InstanceDouble
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

    it('correctly curries the first 3 arguments', () => {
      const request = sinon.spy(),
            resource = 'alpha',
            statics = ['foo'];

      const response = staticFactory(request, resource, statics);

      response.foo('arg').should.eql([request, resource, {}, 'arg']);
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

  describe('instanceFactory', () => {
    const { instanceFactory } = factory;

    it('returns requested instance methods', () => {
      const request = sinon.spy(),
            resource = 'alpha',
            statics = ['ping', 'pong'];

      const response = instanceFactory(request, resource, statics);

      response.should.have.property('ping');
      response.should.have.property('pong');
    });

    it('returns result of called requested instance', () => {
      const request = sinon.spy(),
            resource = 'alpha',
            statics = ['ping'];

      const response = instanceFactory(request, resource, statics);

      response.ping.should.eql(InstanceDouble.ping);
    });

    it('throws if the requested static does not exist', () => {
      const request = sinon.spy(),
            resource = 'alpha',
            statics = ['unknown'];

      (function () {
        instanceFactory(request, resource, statics);
      }).should.throw(/asked to generate a 'unknown' instance method/);
    });
  });
});
