'use strict';

const should              = require('should'),
      co                  = require('co'),
      behavior            = require('./shared_behavior'),
      { DEFAULT_TIMEOUT } = require('./config'),
      { setup,
        teardown,
        getUniqueName }   = require('./helper');

describe('Task', function () {
  this.timeout(DEFAULT_TIMEOUT);

  before(function () {
    return setup(this).
      then(_ => {
        this.Resource = this.client.Task;
      });
  });

  after(function () { teardown(this); });

  beforeEach(function () {
    this.attributes = {
      name: getUniqueName()
    };
  });

  behavior.creatable();
  behavior.findable();
  behavior.removable();
  behavior.updatable();
});
