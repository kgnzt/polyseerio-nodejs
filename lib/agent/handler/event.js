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
      icon: Icon.CHECK
    });
  }
}
