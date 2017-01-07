'use strict';

const should              = require('should'),
      co                  = require('co'),
      { DEFAULT_TIMEOUT } = require('./config');

describe('Alert', function () {
  const polyseerio = require('../../');

  this.timeout(DEFAULT_TIMEOUT);

  it('can perform a quick start', () => {
    return co(function* () {
      const client = yield polyseerio.start({
        token_env: 'ROOT_KEY'
      }).should.be.fulfilled();

      // go and assert quick start is working...
    });
  });

/*
  it('long form', () => {
    return co(function* () {
      const client = polyseerio({
        token_env: 'ROOT_KEY'
      });

      yield client.startAgent({
        name: 'foo'
      }).should.be.fulfilled();

      // go and assert quick start is working...
    });
  });
  */
});
