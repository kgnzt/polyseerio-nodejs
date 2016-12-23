'use strict';

const should = require('should'),
      sinon  = require('sinon'),
      lodash = require('lodash');

describe('Helper', () => {
  const Helper = require('../../lib/helper');

  describe('resourceToType', () => {
    const { resourceToType } = Helper;

    it('correctly converts resource to type', () => {
      const result = resourceToType('events');

      result.should.eql('event');
    });

    it('handles dashes correctly', () => {
      const result = resourceToType('logic-blocks');

      result.should.eql('logic-block');
    });
  });

  describe('forwardThis', () => {
    const { forwardThis } = Helper;

    function createResourceDouble () {
      return class ResourceDouble {
        constructor () {
          this.one = 'alpha';
        }
      };
    }

    it('correctly forwards context of function to passed method with args', () => {
      const Resource = createResourceDouble();

      const func = function (resource, two, three) {
        return `${resource.one}.${two}.${three}`;
      };

      Resource.prototype.func = forwardThis(func);

      const resource = new Resource(),
            result = resource.func('beta', 'gamma');

      result.should.eql('alpha.beta.gamma');
    });
  });

  describe('resolveToken', () => {
    const { resolveToken } = Helper;

    it('returns the token in the passed options if its not nil', () => {
      const result = resolveToken({
        token: 'something-special'
      });

      result.should.eql('something-special');
    });

    it('returns the env token if token nil but found in env vars', () => {
      process.env.GOOGOO = 'dingo';

      const result = resolveToken({
        token: null,
        token_env: 'GOOGOO'
      });

      result.should.eql('dingo');

      delete process.env.GOOGOO;
    });

    it('returns null if the token in null', () => {
      const result = resolveToken({
        token: null
      });

      lodash.isNull(result).should.eql(true);
    });

    it('returns null if the token in undefined', () => {
      const result = resolveToken({
        token: undefined
      });

      lodash.isNull(result).should.eql(true);
    });
  });


  describe('.clearLoop', () => {
    const { clearLoop,
            loopPromise } = Helper;

    it('throws without a number being passed', () => {
      (function () {
        clearLoop('poing-pong');
      }).should.throw();
    });

    it('will stop looping', (next) => {
      function f () {
        f._callCount = f._callCount || 0;

        return new global.Promise((resolve, reject) => {
          f._callCount++;
          setTimeout(_ => resolve('a'), 1);
        });
      }

      const loopId = loopPromise(f, {
        delay: 10
      });

      setTimeout(_ => {
        clearLoop(loopId);
        const count = f._callCount;

        setTimeout(_ => {
          f._callCount.should.eql(count);
          next();
        }, 100);
      }, 100);
    });
  });

  describe('.loopPromise', () => {
    const { loopPromise } = Helper;

    it('will not loop promise if delay has not yet been met', (next) => {
      function f () {
        f._callCount = f._callCount || 0;

        return new global.Promise((resolve, reject) => {
          f._callCount++;
          setTimeout(_ => resolve('a'), 10);
        });
      }

      const promise = f,
            options = { delay: 200 };

      loopPromise(promise, options);

      setTimeout(_ => {
        f._callCount.should.eql(1);
        next();
      }, 199);
    });

    it('will loop promise if delay has been met', (next) => {
      function f () {
        f._callCount = f._callCount || 0;

        return new global.Promise((resolve, reject) => {
          f._callCount++;
          setTimeout(_ => resolve('a'), 10);
        });
      }

      const promise = f,
            options = { delay: 15 };

      loopPromise(promise, options);

      setTimeout(_ => {
        f._callCount.should.eql(2);
        next();
      }, 26);
    });

    it('wont loop promise if promise itself has not resolved', (next) => {
      function f () {
        f._callCount = f._callCount || 0;

        return new global.Promise((resolve, reject) => {
          f._callCount++;
          setTimeout(_ => resolve('a'), 200);
        });
      }

      const promise = f,
            options = { delay: 100 };

      loopPromise(promise, options);

      setTimeout(_ => {
        f._callCount.should.eql(1);
        next();
      }, 100);
    });
  });

  describe('forward', () => {
    const { forward } = Helper;

    it('forwards adjusted arguments for objects', () => {
      const args = [{
              alpha: 'a',
              beta: 'b'
            }],
            adjustments = [{
              beta: 'c'
            }];

      const result = forward(args, adjustments);

      result[0].alpha.should.eql('a');
      result[0].beta.should.eql('c');
    });

    it('will not mutate original object', () => {
      const args = [{
              alpha: 'a',
              beta: 'b'
            }],
            adjustments = [{
              beta: 'c'
            }];

      const result = forward(args, adjustments);

      args[0].alpha.should.eql('a');
      args[0].beta.should.eql('b');
      adjustments[0].beta.should.eql('c');
    });
  });

  describe('createOptions', () => {
    const { createOptions } = Helper;

    it('returns the correct composition', () => {
      const options = {
              foo: 'bar',
              alpha: 'beta'
            },
            defaults = {
              foo: 'zip',
              king: 'kong'
            };
      const result = createOptions(options, defaults);

      result.should.eql({
        foo: 'bar',
        alpha: 'beta',
        king: 'kong'
      });
    });
  });

  describe('wrapRequeset', () => {
    const { wrapRequest } = Helper;

    it('correctly returns a wrapper instance of request', () => {
      const request = sinon.spy(),
            middleware = sinon.stub();

      const result = wrapRequest(request, middleware);

      result.should.be.a.Function();
    });

    it('correctly wraps wrappable api methods', () => {
      const request = sinon.spy(),
            middleware = sinon.stub();

      const result = wrapRequest(request, middleware);

      result.should.have.property('put');
      result.should.have.property('patch');
      result.should.have.property('post');
      result.should.have.property('del');
      result.should.have.property('delete');
      result.should.have.property('get');
    });

    it('when no middleware passed, identity is used for pre and post middleware', () => {
      const request = sinon.stub(),
            options = { foo: 'bar' },
            resultDouble = 'result';

      request.withArgs(options).returns(global.Promise.resolve(resultDouble));

      const wrap = wrapRequest(request);
      
      return wrap(options).
        then(result => {
          request.calledWithExactly(options).should.eql(true);
          result.should.eql(resultDouble);
        });
    });

    it('options passed to request are the result of post middleware', () => {
      const request = sinon.stub(),
            options = { foo: 'bar' },
            pre = sinon.stub(),
            resultDouble = 'result';

      pre.returns('fizzle');
      request.withArgs('fizzle').returns(global.Promise.resolve(resultDouble));

      const wrap = wrapRequest(request, {
        pre
      });

      return wrap(options).
        then(result => {
          request.calledWithExactly('fizzle').should.eql(true);
          result.should.eql(resultDouble);
        });
    });

    it('result of request is the result of post middleware', () => {
      const request = sinon.stub(),
            options = { foo: 'bar' },
            post = sinon.stub(),
            resultDouble = 'result';

      post.returns(resultDouble);
      request.withArgs(options).returns(global.Promise.resolve('foo'));

      const wrap = wrapRequest(request, { post });

      return wrap(options).
        then(result => {
          result.should.eql(resultDouble);
        });
    });

    it('result of request is the result of post middleware', () => {
      const request = sinon.stub(),
            options = { foo: 'bar' },
            post = sinon.stub(),
            resultDouble = 'result';

      post.returns(resultDouble);
      request.withArgs(options).returns(global.Promise.resolve('foo'));

      const wrap = wrapRequest(request, { post });

      return wrap(options).
        then(result => {
          result.should.eql(resultDouble);
        });
    });

    it('when no reject middleware, rejection works as normal', () => {
      const request = sinon.stub(),
            options = { foo: 'bar' },
            error = new Error('foo');

      request.withArgs(options).returns(global.Promise.reject(error));

      const wrap = wrapRequest(request);

      return wrap(options).should.be.rejectedWith('foo');
    });

    it('allows for reject middleware', () => {
      const request = sinon.stub(),
            options = { foo: 'bar' },
            reject = function () {
              return global.Promise.reject(new Error('reject-reject'));
            },
            error = new Error('foo');

      request.withArgs(options).returns(global.Promise.reject(error));

      const wrap = wrapRequest(request, { reject });

      return wrap(options).should.be.rejectedWith('reject-reject');
    });

    it('reject middleware could resolve if it needed to', () => {
      const request = sinon.stub(),
            options = { foo: 'bar' },
            reject = function () {
              return global.Promise.resolve('flower');
            },
            error = new Error('foo');

      request.withArgs(options).returns(global.Promise.reject(error));

      const wrap = wrapRequest(request, { reject });

      return wrap(options).should.be.fulfilledWith('flower');
    });

    it('wraps api methods', () => {
      const request = sinon.stub();

      const wrap = wrapRequest(request);

      wrap.should.have.property('del');
      wrap.should.have.property('delete');
      wrap.should.have.property('get');
      wrap.should.have.property('patch');
      wrap.should.have.property('post');
      wrap.should.have.property('put');
    });
  });

  describe('formatPayload', () => {
    const { formatPayload } = Helper;

    it('correctly formats a payload', () => {
      const payload = {
        foo: 'bar',
        ding: {
          king: 'kong'
        }
      };
  
      const result = formatPayload(payload);
  
      result.should.eql({
        data: {
          attributes: {
            foo: 'bar',
            ding: {
              king: 'kong'
            }
          }
        }
      });
    });
  });

  describe('remapObjectPaths', () => {
    const { remapObjectPaths } = Helper;

    it('correctly remaps one objects paths to another', () => {
      const object = {
              king: 'bar',
              alpha: 'dong'
            },
            paths = {
              king: 'foo',
              alpha: 'ding'
            };

      const result = remapObjectPaths(object, paths);

      result.should.eql({
        foo: 'bar',
        ding: 'dong'
      });
    });
  });

  describe('deduceEid', () => {
    const { deduceEid } = Helper;

    const key = 'TEST_ENV_KEY',
          environments = {
            alpha: 'betta',
            gamma: 'delta',
            foo: 'bar'
          },
          env = {
            UNO: 'uno',
            DOS: 'dos',
            TEST_ENV_KEY: 'foo'
          };

    it('returns the EID of the current environment', () => {
      const result = deduceEid(key, environments, env);

      result.should.eql('bar');
    });

    it('throws an Error when the passed key is not in the env map', () => {
      (function () {
        deduceEid('NOT_IN_ENV', {bar: 'king'}, {FOO: 'bar'});
      }).should.throw('Could not create an environment map, no environment variable named: NOT_IN_ENV could be found.');
    });

    it('throws an Error when the key is in the env map but no match is found in the environment', () => {
      (function () {
        deduceEid('FOO', {ping: 'pong'}, {FOO: 'bar'});
      }).should.throw('Could not find the current environment: bar in the environments passed.');
    });
  });
});
