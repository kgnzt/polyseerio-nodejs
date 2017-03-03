'use strict';

const logger              = require('../../logger'),
      { attachToProcess } = require('../helper'),
      { Process }         = require('../enum');

const Listener = {
  [Process.EXIT]: function (_config, client) {
    return function (code) {
      return client.Event.create({
        name: `${client.instance.get('name')} exited with code: ${code}.`,
        color: client.Color.RED,
        icon: client.Icon.ERROR
      });
    };
  },

  [Process.UNCAUGHT_EXCEPTION]: function (_config, client) {
    return function (error) {
      return client.Event.create({
        name: `${client.instance.get('name')} experienced an uncaught exception.`,
        description: `${error.name}: ${error.message}.`,
        color: client.Color.RED,
        icon: client.Icon.ERROR
      });
    };
  },

  [Process.UNHANDLED_REJECTION]: function (_config, client) {
    return function (reason, promise) {
      return client.Event.create({
        name: `${client.instance.get('name')} experienced an unhandled rejection.`,
        description: `Reason: ${reason}.`,
        color: client.Color.RED,
        icon: client.Icon.ERROR
      });
    };
  },

  [Process.WARNING]: function (_config, client) {
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
  [Process.SIGHUP]: function (_config, client) {
    return function () {
      logger.log('debug', `Process received ${Process.SIGHUP}.`);

      return client.Event.create({
        name: `${client.instance.get('name')} received ${Process.SIGHUP}.`,
        color: client.Color.PURPLE,
        icon: client.Icon.SIGNAL
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
  [Process.SIGINT]: function (_config, client) {
    return function () {
      logger.log('debug', `Process received ${Process.SIGINT}.`);

      return client.Event.create({
        name: `${client.instance.get('name')} received ${Process.SIGINT}.`,
        color: client.Color.PURPLE,
        icon: client.Icon.SIGNAL
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
  [Process.SIGTERM]: function (_config, client) {
    return function () {
      logger.log('debug', `Process received ${Process.SIGTERM}.`);

      return client.Event.create({
        name: `${client.instance.get('name')} received ${Process.SIGTERM}.`,
        color: client.Color.PURPLE,
        icon: client.Icon.SIGNAL
      }).then(_ => {
        return client._agent.stop();
      }).then(_ => {
        logger.log('debug', `Agent has been stopped.`);
      });
    };
  }
};

const attach = attachToProcess(Listener, process);

module.exports = {
  [Process.EXIT]:                attach(Process.EXIT),
  [Process.UNCAUGHT_EXCEPTION]:  attach(Process.UNCAUGHT_EXCEPTION),
  [Process.UNHANDLED_REJECTION]: attach(Process.UNHANDLED_REJECTION),
  [Process.WARNING]:             attach(Process.WARNING),
  [Process.SIGHUP]:              attach(Process.SIGHUP),
  [Process.SIGINT]:              attach(Process.SIGINT),
  [Process.SIGTERM]:             attach(Process.SIGTERM)
};
