'use strict';

var Fact = {
  ARCHITECTURE: 'architecture',
  CPU_COUNT: 'cpu_count',
  ENDIANNESS: 'endianness',
  FREE_MEMORY: 'free_memory',
  GID: 'gid',
  HOME_DIRECTORY: 'home_directory',
  HOSTNAME: 'hostname',
  LAUNCH_ARGUMENTS: 'launch_arguments',
  NODE_VERSION: 'node_version',
  PID: 'pid',
  PLATFORM: 'platform',
  TITLE: 'title',
  UID: 'uid',
  UPTIME: 'uptime',
  V8_VERSION: 'v8_version'
};

var Expectation = {
  IS_ALIVE: 'is_alive'
};

var Event = {
  START: 'start',
  STOP: 'stop'
};

var Process = {
  EXIT: 'exit',
  UNCAUGHT_EXCEPTION: 'uncaughtException',
  UNHANDLED_REJECTION: 'unhandledRejection',
  WARNING: 'warning',
  SIGHUP: 'SIGHUP',
  SIGINT: 'SIGINT',
  SIGTERM: 'SIGTERM'
};

var Metric = {
  MEMORY: 'memory',
  CPU: 'cpu',
  UPTIME: 'uptime'
};

module.exports = {
  Event: Event,
  Expectation: Expectation,
  Fact: Fact,
  Metric: Metric,
  Process: Process
};