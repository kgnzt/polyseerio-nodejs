'use strict';

const should              = require('should'),
      co                  = require('co'),
      { DEFAULT_TIMEOUT } = require('./config'),
      { setup,
        teardown }        = require('./helper');

describe('Events', function () {
  this.timeout(DEFAULT_TIMEOUT);

  let Client = null,
      Event = null;

  before(() => {
    return setup().then(C => [Client, Event] = [C, C.Event]);
  });

  after(() => teardown(Client));

  it('can create an event', () => {
    return co(function* () {
      yield Event.create({ name: 'zoo' }).should.be.fulfilled();
    });
  });

  it('can find events', () => {
    return co(function* () {
      yield Event.find({}).should.be.fulfilled();
    });
  });

  it('can find an event by id', () => {
    return co(function* () {
      const resource = yield Event.create({ name: 'zoo' });

      yield Event.findById(resource.id).should.be.fulfilled();
    });
  });

  it('instances can be saved', () => {
    return co(function* () {
      let resource = yield Event.create({ name: 'zoo' });

      resource = yield resource.save();
    });
  });
});
