'use strict';

const Resource        = require('../../resource'),
      Logic           = require('../logic.json'),
      { Expectation } = require('../enum'),
      { Determiner }  = require('../../enum');

module.exports = {
  [Expectation.IS_ALIVE] (client, instance) {
    return client.Expectation.create({
      name: `${instance.name} instance is alive.`,
      description: `Agent created expectation.`,
      is_on: true,
      determiner: Determiner.ONE,
      subject: 'instance',
      subjects: [instance.id],
      is_expected: true,
      logic: Logic[Expectation.IS_ALIVE]
    });
  }
}
