'use strict';

const should                 = require('should'),
      co                     = require('co'),
      { ensureEnvironments,
        removeEnvironments,
        TestEnvironment }    = require('./helper'),
      { ROOT_KEY,
        DEFAULT_TIMEOUT }    = require('./config');

const DeductionEnvironment = {
  name: 'deduction-environment'
};

describe('Environment deduction', function () {
  this.timeout(DEFAULT_TIMEOUT);

  const env = 'PING_PONG',
        polyseerio = require('../../'),
        Client = polyseerio(ROOT_KEY, { 
          deduce: true,
          env
        });

  before(() => {
    process.env[env] = DeductionEnvironment.name;

    return ensureEnvironments(Client.Environment, [
      TestEnvironment,
      DeductionEnvironment
    ]);
  });

  after(() => {
    process.env[env] = undefined;

    return removeEnvironments(Client.Environment, [
      TestEnvironment,
      DeductionEnvironment
    ]);
  });

  it('places resource into correct environment', () => {
    return co(function* () {
      const { Event } = Client;

      const event = yield Event.create({ name: 'test' });

      yield Event.findById(event.id, {
        environment: DeductionEnvironment.name
      }).should.be.fulfilled();
    });
  });

  it('allows for overriding deduction on environment', () => {
    return co(function* () {
      const { Event } = Client;

      const event = yield Event.create({ 
        name: 'test' 
      }, {
        environment: TestEnvironment.name
      });

      yield Event.findById(event.id, {
        environment: DeductionEnvironment.name
      }).should.be.rejected();

      yield Event.findById(event.id, {
        environment: TestEnvironment.name
      }).should.be.fulfilled();
    });
  });
});
