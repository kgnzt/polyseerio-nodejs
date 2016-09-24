'use strict';

const should = require('should'),
      { getClient } = require('./helper');

describe('Client instantiation testing', () => {
  const Client = require('../../lib/client');

  it('a can be created', () => {
    const client = getClient();

    client.should.be.an.instanceOf(Client);
  });
});
