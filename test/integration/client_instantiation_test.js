'use strict';

const should        = require('should'),
      polyseerio    = require('../../'),
      { getClient } = require('./helper');

describe('Client instantiation testing', () => {
  const Client = require('../../lib/client');

  it('can be created', () => {
    const client = getClient();

    client.should.be.an.instanceOf(Client);
  });

  it('will configure without a token if one can be found in the environment', () => {
    const value = process.env.POLYSEERIO_TOKEN;

    process.env.POLYSEERIO_TOKEN = 'alpha-beta';

    (function () {
      const client = polyseerio();

      client.should.be.an.instanceOf(Client);
    }).should.not.throw();

    process.env.POLYSEERIO_TOKEN  = value;
  });

  it('will not configure if a token cannot be found in the environment', () => {
    const value = process.env.POLYSEERIO_TOKEN;

    delete process.env.POLYSEERIO_TOKEN;

    (function () {
      const client = polyseerio();

      client.should.be.an.instanceOf(Client);
    }).should.throw();

    process.env.POLYSEERIO_TOKEN  = value;
  });
});
