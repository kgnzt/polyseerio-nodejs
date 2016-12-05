'use strict';

const { attachToProcess } = require('../helper'),
      { Signal }          = require('../enum'),
      { Color,
        Icon }            = require('../../enum');

const Listener = {
  [Signal.SIGHUP]: function (client, instance) {
    return function () {
      instance.detach(); // maybe make a promise?

      return client.Event.create({
        name: `${instance.name} received ${Signal.SIGHUP}.`,
        color: Color.PURPLE,
        icon: Icon.SIGNAL
      });
    };
  },

  [Signal.SIGINT]: function (client, instance) {
    return function () {
      instance.detach(); // maybe make a promise?

      return client.Event.create({
        name: `${instance.name} received ${Signal.SIGINT}.`,
        color: Color.PURPLE,
        icon: Icon.SIGNAL
      });
    };
  },

  [Signal.SIGTERM]: function (client, instance) {
    return function () {
      instance.detach(); // maybe make a promise?

      return client.Event.create({
        name: `${instance.name} received ${Signal.SIGTERM}.`,
        color: Color.PURPLE,
        icon: Icon.SIGNAL
      });
    };
  }
};

const attach = attachToProcess(Listener);

module.exports = {
  [Signal.SIGHUP]:  attach(Signal.SIGHUP),
  [Signal.SIGINT]:  attach(Signal.SIGINT),
  [Signal.SIGTERM]: attach(Signal.SIGTERM)
};
