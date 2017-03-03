'use strict';

const os = require('os'),
      { Fact } = require('../enum');

module.exports = {
  [Fact.ARCHITECTURE] (_config, client) {
    client.instance.addFact('architecture', process.arch);
  },

  [Fact.CPU_COUNT] (_config, client) {
    client.instance.addFact('cpu_count', os.cpus().length);
  },

  [Fact.ENDIANNESS] (_config, client) {
    client.instance.addFact('endianness', os.endianness());
  },

  [Fact.FREE_MEMORY] (_config, client) {
    client.instance.addFact('free_memory', function () {
      return os.freemem();
    });
  },

  [Fact.HOME_DIRECTORY] (_config, client) {
    client.instance.addFact('home_directory', os.homedir());
  },

  [Fact.HOSTNAME] (_config, client) {
    client.instance.addFact('hostname', os.hostname());
  },

  [Fact.GID] (_config, client) {
    client.instance.addFact('gid', process.getgid());
  },

  [Fact.LAUNCH_ARGUMENTS] (_config, client) {
    const value = process.argv.join(' ');

    client.instance.addFact('launch_arguments', value);
  },

  [Fact.UPTIME] (_config, client) {
    client.instance.addFact('uptime', function () {
      return process.uptime();
    });
  },

  [Fact.NODE_VERSION] (_config, client) {
    client.instance.addFact('node_version', process.versions.node);
  },

  [Fact.PID] (_config, client) {
    client.instance.addFact('pid', process.pid);
  },

  [Fact.PLATFORM] (_config, client) {
    client.instance.addFact('platform', process.platform);
  },

  [Fact.TITLE] (_config, client) {
    client.instance.addFact('title', process.title);
  },

  [Fact.UID] (_config, client) {
    client.instance.addFact('uid', process.getuid());
  },

  [Fact.V8_VERSION] (_config, client) {
    client.instance.addFact('v8_version', process.versions.v8);
  }
};
