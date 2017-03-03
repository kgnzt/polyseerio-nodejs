'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Logic = require('../logic.json'),
    _require = require('../enum'),
    Expectation = _require.Expectation;


module.exports = _defineProperty({}, Expectation.IS_ALIVE, function (_config, client) {
  return client.Expectation.create({
    name: client.instance.get('name') + ' instance is alive.',
    description: 'Agent created expectation.',
    is_on: true,
    determiner: client.Determiner.ONE,
    subject: client.Type.INSTANCE,
    subjects: [client.instance.get('id')],
    is_expected: true,
    logic: Logic[Expectation.IS_ALIVE]
  });
});