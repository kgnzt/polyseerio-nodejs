'use strict';

const should              = require('should'),
      co                  = require('co'),
      behavior            = require('./shared_behavior'),
      { DEFAULT_TIMEOUT } = require('./config'),
      { setup,
        teardown,
        getUniqueName }   = require('./helper');

describe('Alert', function () {
  this.timeout(DEFAULT_TIMEOUT);

  before(function () {
    return setup(this).
      then(_ => {
        this.Resource = this.client.Alert;
      });
  });

  after(function () { teardown(this); });

  beforeEach(function () {
    this.attributes = {
      name: getUniqueName(),
      message: 'yahhoo',
      protocol: 'smtp',
      recipients: ['foo@bar.com']
    };
  });

  behavior.creatable();
  behavior.findable();
  behavior.uniquelyNameable();
  behavior.removable();
  behavior.updatable();
  behavior.triggerable();
});
