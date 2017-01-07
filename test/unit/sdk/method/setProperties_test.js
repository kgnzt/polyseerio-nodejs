'use strict';

const should = require('should'),
      sinon = require('sinon');

describe('set', () => {
  const method = require('../../../../lib/sdk/method/setProperties');

  function createInstance () {
    return {
      foo: 'window',
      alpha: 'beta',
      ping: 'dork',
      set: sinon.spy()
    };
  }

  it('updates the attribute', () => {
    const instance = createInstance();

    method(instance, {
      foo: 'bar',
      ping: 'pong'
    });

    instance.set.calledWithExactly('foo', 'bar').should.eql(true);
    instance.set.calledWithExactly('ping', 'pong').should.eql(true);

    instance.set.callCount.should.eql(2);
  });

  it('returns the instance', () => {
    const instance = createInstance();

    const result = method(instance, {});

    result.should.equal(instance);
  });
});
