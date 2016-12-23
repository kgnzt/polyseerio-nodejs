'use strict';

const should = require('should');

describe('get', () => {
  const method = require('../../../../lib/sdk/method/get');

  it('returns the attribute', () => {
    const result = method({
      _attributes: {
        foo: 'bar'
      }
    }, 'foo');

    result.should.eql('bar');
  });

  it('defaults to undefined', () => {
    const result = method({
      _attributes: {
        foo: 'bar'
      }
    }, 'alpha');

    (result === undefined).should.eql(true);
  });

  it('allows for a default', () => {
    const result = method({
      _attributes: {
        foo: 'bar'
      }
    }, 'alpha', 'zoomie');

    result.should.eql('zoomie');
  });
});
