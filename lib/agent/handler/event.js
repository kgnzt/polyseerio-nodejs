'use strict';

var _module$exports;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Interface = require('./interface'),
    _require = require('../helper'),
    attachToProcess = _require.attachToProcess,
    _require2 = require('../enum'),
    Event = _require2.Event;


module.exports = (_module$exports = {}, _defineProperty(_module$exports, Event.START, function (_config, client) {
  return client.Event.create({
    name: client.instance.get('name') + ' agent has started.',
    color: client.Color.GREEN,
    icon: client.Icon.CHAIN
  });
}), _defineProperty(_module$exports, Event.STOP, _defineProperty({}, Interface.TEARDOWN, function (_config, client) {
  return client.Event.create({
    name: client.instance.get('name') + ' agent has stopped.',
    color: client.Color.ORANGE,
    icon: client.Icon.CHAIN_BROKEN
  });
})), _module$exports);