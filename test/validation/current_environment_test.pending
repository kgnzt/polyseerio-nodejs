'use strict';

const should              = require('should'),
      co                  = require('co'),
      { ROOT_KEY,
        DEFAULT_TIMEOUT } = require('./config');

describe('Current Environment', function () {
  this.timeout(DEFAULT_TIMEOUT);

  const env = 'ZOO',
        environment = 'testing';

  const polyseerio = require('../../'),
        client = polyseerio(ROOT_KEY, { 
          deduce: true,
          env
        });

  before(() => {
    process.env[env] = environment;
  });

  after(() => {
    delete process.env[env];
  });

  it('.getClient returns the current environment', () => {
    return co(function* () {
      const environment = yield client.getCurrentEnvironment();

      environment.name.should.eql('testing');
    });
  });
});
