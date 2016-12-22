'use strict';

const { attachToProcess } = require('../helper'),
      { Process }         = require('../enum'),
      { Color, 
        Icon }            = require('../../enum');

const Listener = {
  [Process.EXIT]: function (client, instance) {
    return function (code) {
      return client.Event.create({
        name: `${instance.name} exited with code: ${code}.`,
        color: Color.RED,
        icon: Icon.ERROR
      });
    };
  },

  [Process.UNCAUGHT_EXCEPTION]: function (client, instance) {
    return function (error) {
      return client.Event.create({
        name: `${instance.name} experienced an uncaught exception.`,
        description: `${error.name}: ${error.message}.`,
        color: Color.RED,
        icon: Icon.ERROR
      });
    };
  },

  [Process.UNHANDLED_REJECTION]: function (client, instance) {
    return function (reason, promise) {
      return client.Event.create({
        name: `${instance.name} experienced an unhandled rejection.`,
        description: `Reason: ${reason}.`,
        color: Color.RED,
        icon: Icon.ERROR
      });
    };
  },

  [Process.WARNING]: function (client, instance) {
    return function () {
      return global.Promise.reoslve();
    };
  },

  /**
   * Fired when the process receives SIGHUP.
   *
   * @param {Client}
   * @param {Instance}
   * @return {Promise}
   */
  [Process.SIGHUP]: function (client, instance) {
    return function () {
      logger.log('debug', `Process received ${Process.SIGHUP}.`);

      return client.Event.create({
        name: `${instance.name} received ${Process.SIGHUP}.`,
        color: Color.PURPLE,
        icon: Icon.SIGNAL
      });
    };
  },

  /**
   * Fired when the process receives SIGINT.
   *
   * @param {Client}
   * @param {Instance}
   * @return {Promise}
   */
  [Process.SIGINT]: function (client, instance) {
    return function () {
      logger.log('debug', `Process received ${Process.SIGINT}.`);

      return client.Event.create({
        name: `${instance.name} received ${Process.SIGINT}.`,
        color: Color.PURPLE,
        icon: Icon.SIGNAL
      }).then(_ => {
        return client._agent.stop();
      }).then(_ => {
        logger.log('debug', `Agent has been stopped.`);
      });
    };
  },

  /**
   * Fired when the process receives SIGTERM.
   *
   * @param {Client}
   * @param {Instance}
   * @return {Promise}
   */
  [Process.SIGTERM]: function (client, instance) {
    return function () {
      logger.log('debug', `Process received ${Process.SIGTERM}.`);

      return client.Event.create({
        name: `${instance.name} received ${Process.SIGTERM}.`,
        color: Color.PURPLE,
        icon: Icon.SIGNAL
      }).then(_ => {
        return client._agent.stop();
      }).then(_ => {
        logger.log('debug', `Agent has been stopped.`);
      });
    };
  }
};

const attach = attachToProcess(Listener);

module.exports = {
  [Process.EXIT]:                attach(Process.EXIT),
  [Process.UNCAUGHT_EXCEPTION]:  attach(Process.UNCAUGHT_EXCEPTION),
  [Process.UNHANDLED_REJECTION]: attach(Process.UNHANDLED_REJECTION),
  [Process.WARNING]:             attach(Process.WARNING),
  [Process.SIGHUP]:              attach(Process.SIGHUP),
  [Process.SIGINT]:              attach(Process.SIGINT),
  [Process.SIGTERM]:             attach(Process.SIGTERM)
};
