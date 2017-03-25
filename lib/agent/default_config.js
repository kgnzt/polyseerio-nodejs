'use strict';

var _fact, _metric, _event, _process;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Handler = require('./enum'),
    _require = require('../enum'),
    Strategy = _require.Strategy,
    Direction = _require.Direction,
    Subtype = _require.Subtype;


module.exports = {
  attach: true,
  attach_strategy: Strategy.FALLBACK,
  id: null,
  name: null,
  description: 'Created by the Polyseer.io Node.JS agent.',
  group: 'agent',
  direction: Direction.INBOUND,
  subtype: Subtype.LONG_RUNNING,
  agent_retry: 60000, // 1 minute
  // disabled until better discovery pattern
  expectation: _defineProperty({}, Handler.Expectation.IS_ALIVE, false),
  fact: (_fact = {}, _defineProperty(_fact, Handler.Fact.ARCHITECTURE, true), _defineProperty(_fact, Handler.Fact.CPU_COUNT, true), _defineProperty(_fact, Handler.Fact.ENDIANNESS, true), _defineProperty(_fact, Handler.Fact.FREE_MEMORY, true), _defineProperty(_fact, Handler.Fact.GID, true), _defineProperty(_fact, Handler.Fact.HOME_DIRECTORY, true), _defineProperty(_fact, Handler.Fact.HOSTNAME, true), _defineProperty(_fact, Handler.Fact.LAUNCH_ARGUMENTS, true), _defineProperty(_fact, Handler.Fact.NODE_VERSION, true), _defineProperty(_fact, Handler.Fact.PID, true), _defineProperty(_fact, Handler.Fact.PLATFORM, true), _defineProperty(_fact, Handler.Fact.TITLE, true), _defineProperty(_fact, Handler.Fact.UID, true), _defineProperty(_fact, Handler.Fact.UPTIME, true), _defineProperty(_fact, Handler.Fact.V8_VERSION, true), _fact),
  metric: (_metric = {}, _defineProperty(_metric, Handler.Metric.MEMORY, true), _defineProperty(_metric, Handler.Metric.CPU, true), _defineProperty(_metric, Handler.Metric.UPTIME, true), _metric),
  event: (_event = {}, _defineProperty(_event, Handler.Event.START, true), _defineProperty(_event, Handler.Event.STOP, true), _event),
  process: (_process = {}, _defineProperty(_process, Handler.Process.EXIT, true), _defineProperty(_process, Handler.Process.WARNING, true), _defineProperty(_process, Handler.Process.UNCAUGHT_EXCEPTION, true), _defineProperty(_process, Handler.Process.UNHANDLED_REJECTION, true), _defineProperty(_process, Handler.Process.SIGHUP, true), _defineProperty(_process, Handler.Process.SIGINT, true), _defineProperty(_process, Handler.Process.SIGTERM, true), _process)
};