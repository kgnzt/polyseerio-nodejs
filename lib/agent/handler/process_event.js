'use strict';

const { attachToProcess } = require('../helper'),
      { Signal,
        ProcessEvent }    = require('../enum'),
      { Color, 
        Icon }            = require('../../enum');

const Listener = {
  [ProcessEvent.EXIT]: function (client, instance) {
    return function (code) {
      return client.Event.create({
        name: `${instance.name} exited with code: ${code}.`,
        color: Color.RED,
        icon: Icon.ERROR
      });
    };
  },

  [ProcessEvent.UNCAUGHT_EXCEPTION]: function (client, instance) {
    return function (error) {
      return client.Event.create({
        name: `${instance.name} experienced an uncaught exception.`,
        description: `${error.name}: ${error.message}.`,
        color: Color.RED,
        icon: Icon.ERROR
      });
    };
  },

  [ProcessEvent.UNHANDLED_REJECTION]: function (client, instance) {
    return function (reason, promise) {
      return client.Event.create({
        name: `${instance.name} experienced an unhandled rejection.`,
        description: `Reason: ${reason}.`,
        color: Color.RED,
        icon: Icon.ERROR
      });
    };
  },

  [ProcessEvent.WARNING]: function (client, instance) {
    return function () {
      return global.Promise.reoslve();
    };
  }
};

const attach = attachToProcess(Listener);

module.exports = {
  [ProcessEvent.EXIT]:                attach(ProcessEvent.EXIT),
  [ProcessEvent.UNCAUGHT_EXCEPTION]:  attach(ProcessEvent.UNCAUGHT_EXCEPTION),
  [ProcessEvent.UNHANDLED_REJECTION]: attach(ProcessEvent.UNHANDLED_REJECTION),
  [ProcessEvent.WARNING]:             attach(ProcessEvent.WARNING)
};
