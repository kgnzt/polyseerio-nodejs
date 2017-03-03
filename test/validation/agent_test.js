const should              = require('should'),
      co                  = require('co'),
      { DEFAULT_TIMEOUT } = require('./config'),
      { setup,
        teardown }        = require('./helper');

describe('Agent', function () {
  this.timeout(DEFAULT_TIMEOUT);

  before(function () {
    return setup(this);
  });

  after(function () { teardown(this); });

  describe('start', function () {
    it('the agent can be started', function () {
      return this.client.startAgent().should.be.fulfilled().
        then(_ => {
          this.client.stopAgent().should.be.fulfilled();
        });
    });
  });
});
