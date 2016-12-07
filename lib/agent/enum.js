'use strict';

const Expectation = {
  IS_ALIVE:  'is_alive'
};

const Event = {
  START:  'start'
};

const Signal = {
  SIGHUP:  'SIGHUP',
  SIGINT:  'SIGINT',
  SIGTERM: 'SIGTERM'
};

const ProcessEvent = {
  EXIT:                'exit',
  UNCAUGHT_EXCEPTION:  'uncaughtException',
  UNHANDLED_REJECTION: 'unhandledRejection',
  WARNING:             'warning'
};

const Metric = {
  MEMORY: 'memory',
  CPU:    'cpu',
  UPTIME: 'uptime'
};

module.exports = {
  Signal,
  Expectation,
  ProcessEvent,
  Metric,
  Event
};
