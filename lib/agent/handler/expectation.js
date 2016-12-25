'use strict';

const Logic           = require('../logic.json'),
      { Expectation } = require('../enum');

module.exports = {
  [Expectation.IS_ALIVE] (_config, client) {
    return client.Expectation.create({
      name: `${client.instance.get('name')} instance is alive.`,
      description: `Agent created expectation.`,
      is_on: true,
      determiner: client.Determiner.ONE,
      subject: client.Type.INSTANCE,
      subjects: [client.instance.get('id')],
      is_expected: true,
      logic: Logic[Expectation.IS_ALIVE]
    });
  }
};
