'use strict';

const should = require('should'),
      sinon = require('sinon'),
      proxyquire = require('proxyquire');

describe('Resource Factory', () => {
  const DefinitionDouble = {
          foo: {
            instance: [
              'ping'
            ],
            statics: [
              'pong'
            ]
          },
          bar: {
            instance: [
              'ping'
            ],
            statics: [
              'pong'
            ]
          },
          singleton: {
            statics: [
              'pong'
            ]
          }
        },
        factoryDouble = {
          staticFactory: sinon.stub(),
          instanceFactory: sinon.stub()
        };

  const factory = proxyquire('../../../lib/resource/factory', {
    './definition': DefinitionDouble,
    '../sdk/factory': factoryDouble
  });
  
  let memoizeId = 0;

  beforeEach(() => {
    factoryDouble.staticFactory.reset();
    factoryDouble.instanceFactory.reset();
  });

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
      factoryDouble.instanceFactory.returns([]);

      const result = factory(resource, request);

      (function () {
        new result();
      }).should.throw('result is not a constructor');
    });

    it('memoizes between calls based on resource and request', () => {
      const resourceOne = 'foo',
            resourceTwo = 'bar',
            request = sinon.spy();

      factoryDouble.staticFactory.returns([]);
      factoryDouble.instanceFactory.returns([]);

      const firstResult = factory(resourceOne, request),
            secondResult = factory(resourceTwo, request),
            thirdResult = factory(resourceOne, request);

      // we should not be regenerating.
      factoryDouble.staticFactory.callCount.should.eql(2);
      factoryDouble.instanceFactory.callCount.should.eql(2);
    });

    it('adds static methods to resource', () => {
      const resource = 'foo',
            options = sinon.spy(),
            request = sinon.spy();

      factoryDouble.staticFactory.
        withArgs(request, resource, DefinitionDouble.foo.statics, options).
        returns({
          'ping': 'pong'
        });

      factoryDouble.instanceFactory.returns([]);

      const result = factory(resource, request, options, memoizeId++);

      result.should.have.property('ping');
      result.ping.should.eql('pong');
    });

    it('adds instance methods to prototype', () => {
      const resource = 'foo',
            options = sinon.spy(),
            request = sinon.spy();

      factoryDouble.staticFactory.returns([]);

      factoryDouble.instanceFactory.
        withArgs(request, resource, DefinitionDouble.foo.instance).
        returns({
          'ping': 'pong'
        });

      const Result = factory(resource, request, options, memoizeId++);

      const instance = new Result();

      Result.should.not.have.property('ping');
      instance.should.have.property('ping');
      instance.ping.should.eql('pong');
    });
  });

  describe('definesSingleton', () => {
    const { definesSingleton } = factory;

    it('returns true if instances is not defined', () => {
      const definition = {
              statics: ['alpha']
            };

      const result = definesSingleton(definition);

      result.should.eql(true);
    });

    it('returns true if instance is empty', () => {
      const definition = {
              statics: ['alpha'],
              instance: []
            };

      const result = definesSingleton(definition);

      result.should.eql(true);
    });

    it('returns false is instances is defined and has items', () => {
      const definition = {
              statics: ['alpha'],
              instance: ['bar']
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

    it('assigns passed data onto the object', () => {
      const resource = 'foo',
            Resource = createResource(resource);

      const instance = new Resource({ ding: 'dong' });

      instance.ding.should.eql('dong');
    });

    it('sets .isNew to true', () => {
      const resource = 'foo',
            Resource = createResource(resource);

      const instance = new Resource({});

      instance.should.have.property('isNew');
      instance.isNew.should.eql(true);
    });

    it('defaults .eid to null', () => {
      const resource = 'foo',
            Resource = createResource(resource);

      const instance = new Resource({});

      (instance.eid === null).should.eql(true);
    });

    it('sets .eid if passed in attributes', () => {
      const resource = 'foo',
            Resource = createResource(resource);

      const instance = new Resource({ eid: 'lala' });

      instance.eid.should.eql('lala');
    });

    it('assigns attributes to _attributes', () => {
      const resource = 'foo',
            Resource = createResource(resource);

      const instance = new Resource({ ding: 'dong' });

      instance.should.have.property('_attributes');
      instance._attributes.should.eql({
        ding: 'dong'
      });
    });

    it('will not assign reserved keywords', () => {
      const resource = 'foo',
            Resource = createResource(resource);

      const instance = new Resource({ 
        meta: 'alpha',
        relationships: 'alpha'
      });

      if ('meta' in instance) {
        instance.meta.should.not.eql('alpha');
      }

      if ('relationships' in instance) {
        instance.relationships.should.not.eql('alpha');
      }
    });
  });
});
