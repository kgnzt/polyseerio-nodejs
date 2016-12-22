'use strict';

const should              = require('should'),
      co                  = require('co'),
      { DEFAULT_TIMEOUT } = require('./config'),
      { setup,
        teardown }        = require('./helper');

describe('Upsert Environment', function () {
  this.timeout(DEFAULT_TIMEOUT);

  before(function () {
    return setup(this, {
      upsert_env: true
    }).
    then(_ => {
      this.Event = this.client.Event;
    });
  });

  after(function () { teardown(this); });

  it('when upsert_env is on and a resource is created in a non-existent environment it will create the environment and the resource', function() {
    const client = this.client,
          Event = this.Event,
          name = 'zoozoo';

    return co(function* () {
      const event = yield Event.create({ name: 'foofoo' }, {
        environment: name
      });

      event.name.should.eql('foofoo');

      const foundEvent = yield Event.findById(event.id, {
        environment: name
      });

      const environment = yield client.Environment.findByName(name);

      const result = yield client.Environment.remove(environment.id);
    });
  });
});
