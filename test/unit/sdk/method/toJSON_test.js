'use strict';

const should = require('should');

describe('toJSON', () => {
  const method = require('../../../../lib/sdk/method/toJSON');

  it('returns attributes', () => {
    const instance = {
      _attributes: {
        foo: 'bar',
        ping: 'pong'
      }
    };

    const result = method(instance);

    result.should.eql({
      foo: 'bar',
      ping: 'pong'
    });
  });

  it('returns a copy of attributes', () => {
    const instance = {
      _attributes: {
        foo: 'bar',
        ping: 'pong'
      }
    };

    const result = method(instance);

    result.foo = 'ninja';

    instance._attributes.foo.should.eql('bar');
  });
});
