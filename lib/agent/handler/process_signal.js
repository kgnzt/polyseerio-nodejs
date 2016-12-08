'use strict';

const logger              = require('../../logger'),
      { attachToProcess } = require('../helper'),
      { Signal }          = require('../enum'),
      { Color,
        Icon }            = require('../../enum');

const Listener = {
  /**
   * Fired when the process receives SIGHUP.
   *
   * @param {Client}
   * @param {Instance}
   * @return {Promise}
   */
  [Signal.SIGHUP]: function (client, instance) {
    return function () {
      logger.log('debug', `Process received ${Signal.SIGHUP}.`);

      return client.Event.create({
        name: `${instance.name} received ${Signal.SIGHUP}.`,
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
  [Signal.SIGINT]: function (client, instance) {
    return function () {
      logger.log('debug', `Process received ${Signal.SIGINT}.`);

      return client.Event.create({
        name: `${instance.name} received ${Signal.SIGINT}.`,
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
  [Signal.SIGTERM]: function (client, instance) {
    return function () {
      logger.log('debug', `Process received ${Signal.SIGTERM}.`);

      return client.Event.create({
        name: `${instance.name} received ${Signal.SIGTERM}.`,
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
  [Signal.SIGHUP]:  attach(Signal.SIGHUP),
  [Signal.SIGINT]:  attach(Signal.SIGINT),
  [Signal.SIGTERM]: attach(Signal.SIGTERM)
};
