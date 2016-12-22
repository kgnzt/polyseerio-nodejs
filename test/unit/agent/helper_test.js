'use strict';

const should = require('should'),
      sinon  = require('sinon');

describe('Helper', () => {
  const Helper = require('../../../lib/agent/helper');

  const Interface = require('../../../lib/agent/handler/interface');

  describe('reduceHandlerSubtypOption', () => {
    const { reduceHandlerSubtypeOption } = Helper;

    it('correctly adds to accumulator if it is enabled', () => {
      const acc = {},
            config = true,
            key = 'alpha';

      const result = reduceHandlerSubtypeOption(acc, config, key);

      result.should.eql({
        alpha: true
      });
    });

    it('handles the case of enabled options', () => {
      const acc = {},
            config = {
              enabled: true,
              foo: 'bar'
            },
            key = 'alpha';

      const result = reduceHandlerSubtypeOption(acc, config, key);

      result.should.eql({
        alpha: {
          enabled: true,
          foo: 'bar'
        }
      });
    });
  });

  describe('filterEnabledSubtypeOptions', () => {
    const { filterEnabledSubtypeOptions } = Helper;

    it('correctly filters out handlers that are not enabled', () => {
      const subtypeOptions = {
        foo: true,
        bar: {
          enabled: true,
          cork: 'screw'
        },
        king: {
          enabled: false
        },
        dork: false
      };

      const result = filterEnabledSubtypeOptions(subtypeOptions);

      result.should.eql({
        foo: true,
        bar: {
          enabled: true,
          cork: 'screw'
        }
      });
    });
  });

  describe('filterHandlers', () => {
    const { filterHandlers } = Helper;

    it('correctly filters handlers and their subtypes', () => {
      const options = {
        foo: {
          alpha: true,
          beta: {
            enabled: false
          },
          ding: {
            enabled: true,
            cork: 'screw'
          }
        },
        bar: {
          zing: false,
          zang: true,
          king: {
            enabled: true,
            value: 'kong'
          }
        }
      };

      const result = filterHandlers(options);

      result.should.eql({
        foo: {
          alpha: true,
          ding: {
            enabled: true,
            cork: 'screw'
          }
        },
        bar: {
          zang: true,
          king: {
            enabled: true,
            value: 'kong'
          }
        }
      });
    });
  });

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

    it('simply resolves if handler exists but there is only a teardown', () => {
      const map = {
              foo: {
                alpha: {
                  [Interface.TEARDOWN]: sinon.stub()
                }
              }
            },
            client = sinon.stub(),
            config = {
              alpha: {
                zoo: true
              }
            },
            type = 'foo',
            argOne = sinon.stub();

      return setupWithHandler(map, client, config, type, argOne).
        should.be.fulfilled();
    });

    it('allows for handler to be an object with a SETUP key / interface', () => {
      const map = {
              foo: {
                alpha: {
                  [Interface.SETUP]: sinon.stub()
                }
              }
            },
            client = sinon.stub(),
            config = {
              foo: {
                alpha: {
                  zoo: true
                }
              }
            },
            type = 'foo',
            argOne = sinon.stub();

      map.foo.alpha[Interface.SETUP].withArgs(argOne).returns('foo_alpha_result');

      return setupWithHandler(map, client, config, type, argOne).
        should.be.fulfilled().
        then(result => {
          map.foo.alpha[Interface.SETUP].
            calledWithExactly(config.foo.alpha, client, argOne).
            should.eql(true);
        });
    });

    it('rejects when a handler type cannot be found', () => {
      const map = {
              foo: {
                alpha: sinon.stub()
              }
            },
            client = sinon.stub(),
            config = {
              foo: {
                alpha: {
                  zoo: true
                }
              }
            },
            type = 'ding',
            argOne = sinon.stub();

      return setupWithHandler(map, client, config, type, argOne).
        should.be.rejectedWith('Could not find handler type: ding.');
    });

    it('rejects when a handler does not have an item from config', () => {
      const map = {
              foo: {
                alpha: sinon.stub()
              }
            },
            client = sinon.stub(),
            config = {
              foo: {
                zoo: { // there is no foo.zoo handler
                  zoo: true
                }
              }
            },
            type = 'foo',
            argOne = sinon.stub();

      return setupWithHandler(map, client, config, type, argOne).
        should.be.rejectedWith('Could not find handler subtype: zoo.');
    });

    it('calls each handler present in handler config for type', () => {
      const map = {
              foo: {
                alpha: sinon.stub(),
              },
              bar: {
                beta: sinon.stub()
              }
            },
            client = sinon.stub(),
            config = {
              foo: {
                alpha: true,
              },
              bar: {
                beta: true
              }
            },
            type = 'foo',
            argOne = sinon.stub(),
            argTwo = sinon.stub();

      map.foo.alpha.withArgs(argOne, argTwo).returns('foo_alpha_result');
      map.bar.beta.withArgs(argOne, argTwo).returns('bar_beta_result');

      return setupWithHandler(map, client, config, type, argOne, argTwo).
        should.be.fulfilled().
        then(result => {
          map.foo.alpha.
            calledWithExactly(config.foo.alpha, client, argOne, argTwo).
            should.eql(true);
          map.bar.beta.called.should.eql(false);
        });
    });
  });
});
