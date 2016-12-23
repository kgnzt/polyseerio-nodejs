'use strict';

const Interface           = require('./interface'),
      { attachToProcess } = require('../helper'),
      { Event }           = require('../enum'),
      { Color, 
        Icon }            = require('../../enum');

module.exports = {
  /**
   * Event indicates that the agent has started.
   */
  [Event.START] (_config, client) {
    return client.Event.create({
      name: `${client.instance.get('name')} agent has started.`,
      color: Color.GREEN,
      icon: Icon.CHAIN
    });
  },

  /**
   * Event indicates that the agent has stopped.
   */
  [Event.STOP]: {
    [Interface.TEARDOWN] (_config, client) {
      return client.Event.create({
        name: `${client.instance.get('name')} agent has stopped.`,
        color: Color.ORANGE,
        icon: Icon.CHAIN_BROKEN
      });
    }
  }
};
