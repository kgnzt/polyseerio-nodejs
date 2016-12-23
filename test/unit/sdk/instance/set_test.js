'use strict';

const should = require('should');

describe('set', () => {
  const method = require('../../../../lib/sdk/instance/set');

  it('updates the attribute', () => {
    const instance = {
      _attributes: {
        foo: 'bar'
      }
    };

    method(instance, 'foo', 'bar');

    instance._attributes.foo.should.eql('bar');
  });

  it('returns the instance', () => {
    const instance = {
      _attributes: {
        foo: 'bar'
      }
    };

    const result = method(instance, 'foo', 'alpha');

    result.should.equal(instance);
  });
});
