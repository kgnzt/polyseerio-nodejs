'use strict';

const should              = require('should'),
      co                  = require('co'),
      { ROOT_KEY,
        DEFAULT_TIMEOUT } = require('./config');

describe('Environment deduction', function () {
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

  it('places resource into correct environment', () => {
    return co(function* () {
      const { Event } = client;

      const event = yield Event.create({ name: 'test' });

      yield Event.findById(event.id, {
        environment
      }).should.be.fulfilled();
    });
  });

  it('allows for overriding deduction on environment', () => {
    return co(function* () {
      const { Event } = client;

      const event = yield Event.create({ 
        name: 'test' 
      }, {
        environment: 'development'
      });

      yield Event.findById(event.id, {
        environment
      }).should.be.rejected();

      yield Event.findById(event.id, {
        environment: 'development'
      }).should.be.fulfilled();
    });
  });
});
