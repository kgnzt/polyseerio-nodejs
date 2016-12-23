'use strict';

const should     = require('should'),
      sinon      = require('sinon'),
      proxyquire = require('proxyquire'),
      { STATIC,
        METHOD } = require('../../../lib/resource/definition_constant');

describe('Resource Factory', () => {
  const DefinitionDouble = {
          foo: {
            [STATIC]: [
              'pong'
            ],
            [METHOD]: [
              'ping'
            ]
          },
          bar: {
            [STATIC]: [
              'pong'
            ],
            [METHOD]: [
              'ping'
            ]
          },
          singleton: {
            [STATIC]: [
              'pong'
            ]
          }
        },
        factoryDouble = {
          staticFactory: sinon.stub(),
          methodFactory: sinon.stub()
        };

  const factory = proxyquire('../../../lib/resource/factory', {
    './definition': DefinitionDouble,
    '../sdk/factory': factoryDouble
  });
  
  let memoizeId = 0;

  beforeEach(() => {
    factoryDouble.staticFactory.reset();
    factoryDouble.methodFactory.reset();
  });

  function createResourceDouble () {
    return class ResourceDouble {
      constructor () {
        this.one = 'alpha';
      }
    };
  }

  describe('function', () => {
    it('throws if there is no defintion', () => {
      const resource = 'undef',
            request = sinon.spy();

      (function () {
        factory(resource, request);
      }).should.throw(/Could not find definition for resource: undef./);
    });

    it('returns a non constructable object when resource is defined as a singleton', () => {
      const resource = 'singleton',
            request = sinon.spy();

      factoryDouble.staticFactory.returns([]);
      factoryDouble.methodFactory.returns([]);

      const Result = factory(resource, request);

      (function () {
        new Result();
      }).should.throw('Result is not a constructor');
    });

    it('memoizes between calls based on resource and request', () => {
      const resourceOne = 'foo',
            resourceTwo = 'bar',
            request = sinon.spy();

      factoryDouble.staticFactory.returns([]);
      factoryDouble.methodFactory.returns([]);

      const firstResult = factory(resourceOne, request),
            secondResult = factory(resourceTwo, request),
            thirdResult = factory(resourceOne, request);

      // we should not be regenerating.
      factoryDouble.staticFactory.callCount.should.eql(2);
      factoryDouble.methodFactory.callCount.should.eql(2);
    });

    it('adds static methods to resource', () => {
      const resource = 'foo',
            options = sinon.spy(),
            request = sinon.spy();

      factoryDouble.staticFactory.
        withArgs(request, resource, DefinitionDouble.foo[STATIC], options).
        returns({
          'ping': 'pong'
        });

      factoryDouble.methodFactory.returns([]);

      const result = factory(resource, request, options, memoizeId++);

      result.should.have.property('ping');
      result.ping.should.eql('pong');
    });

    it('adds methods to prototype', () => {
      const resource = 'foo',
            options = sinon.spy(),
            request = sinon.spy();

      factoryDouble.staticFactory.returns([]);

      factoryDouble.methodFactory.
        withArgs(request, resource, DefinitionDouble.foo[METHOD]).
        returns({
          'ping': function (_, a) { return a; }
        });

      const Result = factory(resource, request, options, memoizeId++);

      const instance = new Result();

      Result.should.not.have.property('ping');
      instance.should.have.property('ping');
      instance.ping('a').should.eql('a');
    });
  });

  describe('addMethod', () => {
    const { addMethod } = factory;

    it('attaches the method to the prototype with the given name', () => {
      const Resource = createResourceDouble(),
            method = function () {
              return this.one;
            },
            name = 'alpha';

      addMethod(Resource, method, name);

      Resource.prototype.should.have.property(name);
    });

    it('binds correct context to method attached to prototype', () => {
      const Resource = createResourceDouble(),
            method = function (intance) {
              return intance.one;
            },
            name = 'alpha';

      addMethod(Resource, method, name);

      const resource = new Resource();

      const result = resource.alpha().should.eql('alpha');
    });

    it('returns the Resource', () => {
      const Resource = {
              prototype: {}
            },
            method = sinon.stub(),
            name = 'alpha';

      const result = addMethod(Resource, method, name);

      result.should.eql(Resource);
    });
  });

  describe('addStatic', () => {
    const { addStatic } = factory;

    it('attaches method directly to object', () => {
      const Resource = {},
            method = sinon.stub(),
            name = 'alpha';

      addStatic(Resource, method, name);

      Resource.alpha.should.eql(method);
    });

    it('returns the Resource', () => {
      const Resource = {},
            method = sinon.stub(),
            name = 'alpha';

      const result = addStatic(Resource, method, name);

      result.should.eql(Resource);
    });
  });

  describe('addStatics', () => {
    const { addStatics } = factory;

    it('attaches a collection of statics to the object', () => {
      const Resource = {},
            statics = {
              alpha: sinon.stub(),
              beta: sinon.stub()
            };

      addStatics(Resource, statics);

      Resource.should.have.property('alpha');
      Resource.alpha.should.eql(statics.alpha);
      Resource.should.have.property('alpha');
      Resource.beta.should.eql(statics.beta);
    });

    it('returns the Resource', () => {
      const Resource = {},
            statics = {
              alpha: sinon.stub(),
              beta: sinon.stub()
            };

      const result = addStatics(Resource, statics);

      result.should.eql(Resource);
    });
  });

  describe('addMethods', () => {
    const { addMethods } = factory;

    it('returns the Resource if methods are empty and does not throw', () => {
      const Resource = {}, // no prototype
            request = sinon.stub(),
            methods = {};

      (function () {
        const result = addMethods(Resource, request, methods);

        result.should.eql(Resource);
      }).should.not.throw();
    });

    it('attaches a collection of instance methods to the object', () => {
      const Resource = {
              prototype: {}
            },
            request = sinon.stub(),
            methods = {
              alpha: function (instance, ...args) {
                return 'alpha';
              },
              beta: function (instance, ...args) {
                return 'beta';
              }
            };

      addMethods(Resource, request, methods);

      Resource.should.have.propertyByPath('prototype', 'alpha');
      Resource.prototype.alpha().should.eql('alpha');
      Resource.should.have.propertyByPath('prototype', 'beta');
      Resource.prototype.beta().should.eql('beta');
    });

    it('attaches the request to the Resource prototype', () => {
      const Resource = {
              prototype: {}
            },
            request = sinon.stub(),
            methods = {
              alpha: sinon.stub(),
              beta: sinon.stub()
            };

      addMethods(Resource, request, methods);

      Resource.should.have.propertyByPath('prototype', '_request');
      Resource.prototype._request.should.eql(request);
    });

    it('returns the Resource', () => {
      const Resource = {
              prototype: {}
            },
            request = sinon.stub(),
            methods = {
              alpha: sinon.stub(),
              beta: sinon.stub()
            };

      const result = addMethods(Resource, request, methods);

      result.should.eql(Resource);
    });
  });

  describe('getMemoizeKey', () => {
    const { getMemoizeKey } = factory;

    it('returns the correct memoize complex key', () => {
      const resource = 'alpha',
            cid = 33;

      const result = getMemoizeKey(resource, undefined, undefined, cid);

      result.should.eql('alpha.33');
    });
  });

  describe('definesSingleton', () => {
    const { definesSingleton } = factory;

    it('returns true if Symbol("method") is not defined', () => {
      const definition = {
              [STATIC]: ['alpha']
            };

      const result = definesSingleton(definition);

      result.should.eql(true);
    });

    it('returns true if Symbol("method") is empty', () => {
      const definition = {
              [STATIC]: ['alpha'],
              [METHOD]: []
            };

      const result = definesSingleton(definition);

      result.should.eql(true);
    });

    it('returns false is Symbol("method") is defined and has items', () => {
      const definition = {
              [STATIC]: ['alpha'],
              [METHOD]: ['bar']
            };

      const result = definesSingleton(definition);

      result.should.eql(false);
    });
  });

  describe('createResource', () => {
    const { createResource } = factory;

    it('returns a function that is newable', () => {
      const resource = 'foo',
            Resource = createResource(resource);

      (function () {
        new Resource();
      }).should.not.throw();
    });

    it('sets the passed resource name on the instance', () => {
      const resource = 'foo',
            Resource = createResource(resource);

      const instance = new Resource();

      instance.resource.should.eql(resource);
    });
  });
});
