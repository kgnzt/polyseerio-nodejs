'use strict';

const { attachToProcess } = require('../helper'),
      { Event }           = require('../enum'),
      { Color, 
        Icon }            = require('../../enum');

module.exports = {
  [Event.START] (client, instance) {
    return client.Event.create({
      name: `${instance.name} agent has started.`,
      color: Color.GREEN,
      icon: Icon.CHAIN
    });
  },

  [Event.STOP] (client, instance) {
    return client.Event.create({
      name: `${instance.name} agent has stopped.`,
      color: Color.ORANGE,
      icon: Icon.CHAIN_BROKEN
    });
  }
};
