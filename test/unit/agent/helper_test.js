'use strict';

const should = require('should'),
      sinon  = require('sinon');

describe('Helper', () => {
  const Helper = require('../../../lib/agent/helper');

  describe('generateName', () => {
    const { generateName } = Helper;

    it('will stop looping', () => {
    });
  });

  describe('attachToProcess', () => {
    const { attachToProcess } = Helper;

    function createProcessMock () {
      return {
        on: sinon.stub()
      };
    };

    it('currys up to 5 parameters', () => {
      const listeners = {},
            event = 'foo',
            client = sinon.stub(),
            instance = sinon.stub(),
            proc = createProcessMock();

      const result = attachToProcess(listeners, event, client, instance);

      (typeof result === 'function').should.eql(true)
    });

    it('attaches the listener result called with client and instance as a listner to the process', () => {
      const listeners = {
              foo: sinon.stub()
            },
            fooResult = sinon.stub(),
            event = 'foo',
            client = sinon.stub(),
            instance = sinon.stub(),
            proc = createProcessMock();

      listeners.foo.withArgs(client, instance).returns(fooResult);

      attachToProcess(listeners, event, client, instance, proc);

      proc.on.calledWithExactly(event, fooResult).should.eql(true);
    });
  });

  describe('setupWithHandler', () => {
    const { setupWithHandler } = Helper;

    it('currys up to arguments passed', () => {
    });

    it('rejects when a handler type cannot be found', () => {
      const handler = {
              foo: {
                alpha: sinon.stub()
              }
            },
            type = 'ding',
            config = {
              alpha: {
                zoo: true
              }
            },
            argOne = sinon.stub();

      return setupWithHandler(handler, type, config, argOne).
        should.be.rejectedWith('Could not find a handler for type: ding.');
    });

    it('rejects when a handler does not have an item from config', () => {
      const handler = {
              foo: {
                alpha: sinon.stub()
              }
            },
            type = 'foo',
            config = {
              zoo: { // there is no foo.zoo handler
                zoo: true
              }
            },
            argOne = sinon.stub();

      return setupWithHandler(handler, type, config, argOne).
        should.be.rejectedWith('Could not find a handler setup for type: zoo.');
    });

    it('calls each handler present in handler config for type', () => {
      const handler = {
              foo: {
                alpha: sinon.stub()
              },
              bar: {
                beta: sinon.stub()
              }
            },
            type = 'foo',
            config = {
              alpha: {
                zoo: true
              }
            },
            argOne = sinon.stub(),
            argTwo = sinon.stub();

      handler.foo.alpha.withArgs(argOne, argTwo).returns('foo_alpha_result');
      handler.bar.beta.withArgs(argOne, argTwo).returns('bar_beta_result');

      return setupWithHandler(handler, type, config, argOne, argTwo).
        should.be.fulfilled().
        then(result => {
          handler.foo.alpha.calledWithExactly(argOne, argTwo).should.eql(true);
          handler.bar.beta.called.should.eql(false);
        });
    });
  });
});
