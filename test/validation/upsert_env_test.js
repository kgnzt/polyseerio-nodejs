'use strict';

const should              = require('should'),
      co                  = require('co'),
      { DEFAULT_TIMEOUT } = require('./config'),
      { setup,
        teardown }        = require('./helper');

describe('Events', function () {
  this.timeout(DEFAULT_TIMEOUT);

  let Client = null,
      Event = null,
      Environment = null;

  before(() => {
    return setup({
      upsert_env: true
    }).then(C => [Client, Event] = [C, C.Event]);
  });

  after(() => teardown(Client));

  it('when upsert_env is on and a resource is created in a non-existent environment it will create the environment and the resource', () => {
    const name = 'zoozoo';

    return co(function* () {
      yield Event.create({ name: 'foofoo' }, {
        environment: name
      }).should.be.fulfilled().
      then(event => {
        event.name.should.eql('foofoo');

        return Event.findById(event.id, {
          environment: name
        });
      }).should.be.fulfilled();


      // clean up
      yield Client.Environment.findByName(name).
        then(environment => {
          return environment.remove();
        });
    });
  });
});
