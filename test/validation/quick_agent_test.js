'use strict';

const should              = require('should'),
      co                  = require('co'),
      { DEFAULT_TIMEOUT } = require('./config');

describe('Alert', function () {
  const polyseerio = require('../../');

  this.timeout(DEFAULT_TIMEOUT);

  it('can create an alert', () => {
    return co(function* () {
      const client = yield polyseerio.start();

      // go and assert quick start is working...
    });
  });
});
