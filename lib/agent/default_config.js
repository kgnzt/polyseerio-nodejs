'use strict';

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
  heartbeats_till_death: null,
  heartbeat_ttl: null,
  expectation: {
    is_alive: true
  },
  metric: {
    memory: true,
    cpu: true
  },
  event: {
    start: true
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
