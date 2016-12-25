'use strict';

const Interface           = require('./interface'),
      { attachToProcess } = require('../helper'),
      { Event }           = require('../enum');

module.exports = {
  /**
   * Event indicates that the agent has started.
   */
  [Event.START] (_config, client) {
    return client.Event.create({
      name: `${client.instance.get('name')} agent has started.`,
      color: client.Color.GREEN,
      icon: client.Icon.CHAIN
    });
  },

  /**
   * Event indicates that the agent has stopped.
   */
  [Event.STOP]: {
    [Interface.TEARDOWN] (_config, client) {
      return client.Event.create({
        name: `${client.instance.get('name')} agent has stopped.`,
        color: client.Color.ORANGE,
        icon: client.Icon.CHAIN_BROKEN
      });
    }
  }
};
