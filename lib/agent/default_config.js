'use strict';

const Handler     = require('./enum'),
      { Strategy,
        Direction,
        Subtype } = require('../enum');

module.exports = {
  attach: true,
  attach_strategy: Strategy.FALLBACK,
  id: null,
  name: null,
  description: 'Created by the Polyseer.io Node.JS agent.',
  group: 'agent-created',
  direction: Direction.INBOUND,
  subtype: Subtype.LONG_RUNNING,
  expectation: {
    [Handler.Expectation.IS_ALIVE]: true
  },
  fact: {
    [Handler.Fact.ARCHITECTURE]: true,
    [Handler.Fact.CPU_COUNT]: true,
    [Handler.Fact.ENDIANNESS]: true,
    [Handler.Fact.FREE_MEMORY]: true,
    [Handler.Fact.GID]: true,
    [Handler.Fact.HOME_DIRECTORY]: true,
    [Handler.Fact.HOSTNAME]: true,
    [Handler.Fact.LAUNCH_ARGUMENTS]: true,
    [Handler.Fact.NODE_VERSION]: true,
    [Handler.Fact.PID]: true,
    [Handler.Fact.PLATFORM]: true,
    [Handler.Fact.TITLE]: true,
    [Handler.Fact.UID]: true,
    [Handler.Fact.UPTIME]: true,
    [Handler.Fact.V8_VERSION]: true
  },
  metric: {
    [Handler.Metric.MEMORY]: true,
    [Handler.Metric.CPU]: true,
    [Handler.Metric.UPTIME]: true
  },
  event: {
    [Handler.Event.START]: true,
    [Handler.Event.STOP]: true
  },
  process: {
    [Handler.Process.EXIT]: true,
    [Handler.Process.WARNING]: true,
    [Handler.Process.UNCAUGHT_EXCEPTION]: true,
    [Handler.Process.UNHANDLED_REJECTION]: true,
    [Handler.Process.SIGHUP]: true,
    [Handler.Process.SIGINT]: true,
    [Handler.Process.SIGTERM]: true
  }
};
