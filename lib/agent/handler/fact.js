'use strict';

const { Fact } = require('../enum');

module.exports = {
  [Fact.ARCHITECTURE] (client, instance) {
    instance.addFact('architecture', process.arch);
  },

  [Fact.GID] (client, instance) {
    instance.addFact('gid', process.getgid());
  },

  [Fact.LAUNCH_ARGUMENTS] (client, instance) {
    const value = process.argv.join(' ');

    instance.addFact('launch_arguments', value);
  },

  [Fact.NODE_VERSION] (client, instance) {
    instance.addFact('node_version', process.versions.node);
  },

  [Fact.PID] (client, instance) {
    instance.addFact('pid', process.pid);
  },

  [Fact.PLATFORM] (client, instance) {
    instance.addFact('platform', process.platform);
  },

  [Fact.TITLE] (client, instance) {
    instance.addFact('title', process.title);
  },

  [Fact.UID] (client, instance) {
    instance.addFact('uid', process.getuid());
  },

  [Fact.V8_VERSION] (client, instance) {
    instance.addFact('v8_version', process.versions.v8);
  }
};
