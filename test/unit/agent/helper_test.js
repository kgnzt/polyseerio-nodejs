'use strict';

const should = require('should'),
      sinon  = require('sinon');

describe('Helper', () => {
  const Helper = require('../../../lib/agent/helper');

  const Interface = require('../../../lib/agent/handler/interface');

  describe('resolveName', () => {
    const { resolveName } = Helper;

    it('returns the name in config when not nil', () => {
      const config = {
        name: 'blue-whale'
      };

      const result = resolveName(config);

      result.should.eql('blue-whale');
    });

    it('returns a name even when config is nil', () => {
      const config = {
        name: null
      };

      const result = resolveName(config);

      (typeof result === 'string').should.eql(true);
      result.length.should.be.greaterThan(0);
    });
  });

  describe('filterEnabledHandlers', () => {
    const { filterEnabledHandlers } = Helper;

    it('correctly returns only enabled handler items', () => {
      const config = {
        foo: true,
        bar: false,
        king: {
          enabled: true,
          a: 'b'
        },
        kong: {
          enabled: false
        },
        alpha: 'beta'
      };

      const result = filterEnabledHandlers(config);

      result.should.eql({
        foo: true,
        king: {
          enabled: true,
          a: 'b'
        }
      });
    });
  });

  describe('shouldHandle', () => {
    const { shouldHandle } = Helper;

    it('returns true when value is an object enabled: true', () => {
      const result = shouldHandle({
        enabled: true
      });

      (result === true).should.eql(true);
    });

    it('returns false when value is an object enabled: false', () => {
      const result = shouldHandle({
        enabled: false
      });

      (result === false).should.eql(true);
    });

    it('returns true if the value passed is simply true', () => {
      const result = shouldHandle(true);

      (result === true).should.eql(true);
    });

    it('returns false if unknown or unreadable value', () => {
      const result = shouldHandle('woofwoof');

      (result === false).should.eql(true);
    });
  });

  describe('generateName', () => {
    const { generateName } = Helper;

    it('will generate a unique name', () => {
    });
  });

  describe('attachToProcess', () => {
    const { attachToProcess } = Helper;

    function createProcessMock () {
      return {
        on: sinon.stub()
      };
    }

    it('currys up to 5 parameters', () => {
      const listeners = {},
            event = 'foo',
            client = sinon.stub(),
            instance = sinon.stub(),
            proc = createProcessMock();

      const result = attachToProcess(listeners, event, client, instance);

      (typeof result === 'function').should.eql(true);
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

    it('simply resolves if handler exists but there is only a teardown', () => {
      const handler = {
              foo: {
                alpha: {
                  [Interface.TEARDOWN]: sinon.stub()
                }
              }
            },
            type = 'foo',
            config = {
              alpha: {
                zoo: true
              }
            },
            argOne = sinon.stub();

      return setupWithHandler(handler, type, config, argOne).should.be.fulfilled();
    });

    it('allows for handler to be an object with a SETUP key / interface', () => {
      const handler = {
              foo: {
                alpha: {
                  [Interface.SETUP]: sinon.stub()
                }
              }
            },
            type = 'foo',
            config = {
              alpha: {
                zoo: true
              }
            },
            argOne = sinon.stub();

      handler.foo.alpha[Interface.SETUP].withArgs(argOne).returns('foo_alpha_result');

      return setupWithHandler(handler, type, config, argOne).
        should.be.fulfilled().
        then(result => {
          handler.foo.alpha[Interface.SETUP].calledWithExactly(argOne).should.eql(true);
        });
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
        should.be.rejectedWith('Handlers did not contain a type: zoo.');
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
