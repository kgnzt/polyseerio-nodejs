'use strict';

const Resource        = require('../../resource'),
      Logic           = require('../logic.json'),
      { Expectation } = require('../enum'),
      { Determiner }  = require('../../enum');

module.exports = {
  [Expectation.IS_ALIVE] (_config, client) {
    return client.Expectation.create({
      name: `${client.instance.name} instance is alive.`,
      description: `Agent created expectation.`,
      is_on: true,
      determiner: Determiner.ONE,
      subject: 'instance',
      subjects: [client.instance.id],
      is_expected: true,
      logic: Logic[Expectation.IS_ALIVE]
    });
  }
};
