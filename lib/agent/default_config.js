'use strict';

const Handler = require('./enum');

const { Strategy,
        Direction,
        Subtype } = require('../enum');

module.exports = {
  attach: true,
  attach_strategy: Strategy.FALLBACK,
  name: null,
  description: 'Created by the Polyseer.io Node.JS agent.',
  group: 'agent-created',
  direction: Direction.INBOUND,
  subtype: Subtype.LONG_RUNNING,
  expectation: {
    is_alive: true
  },
  fact: {
    [Handler.Fact.GID]: true,
    [Handler.Fact.PID]: true,
    [Handler.Fact.ARCHITECTURE]: true,
    [Handler.Fact.LAUNCH_ARGUMENTS]: true,
    [Handler.Fact.NODE_VERSION]: true,
    [Handler.Fact.PID]: true,
    [Handler.Fact.PLATFORM]: true,
    [Handler.Fact.TITLE]: true,
    [Handler.Fact.UID]: true,
    [Handler.Fact.V8_VERSION]: true
  },
  metric: {
    memory: true,
    cpu: true,
    uptime: true
  },
  event: {
    start: true,
    stop: true
  },
  process_event: {
    exit: true,
    warning: true,
    uncaughtException: true,
    unhandledRejection: true
  },
  process_signal: {
    SIGHUP: true,
    SIGINT: true,
    SIGTERM: true
  }
};
