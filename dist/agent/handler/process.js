'use strict';

var _Listener, _module$exports;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var logger = require('../../logger'),
    _require = require('../helper'),
    attachToProcess = _require.attachToProcess,
    _require2 = require('../enum'),
    Process = _require2.Process;


var Listener = (_Listener = {}, _defineProperty(_Listener, Process.EXIT, function (_config, client) {
  return function (code) {
    return client.Event.create({
      name: client.instance.get('name') + ' exited with code: ' + code + '.',
      color: client.Color.RED,
      icon: client.Icon.ERROR
    });
  };
}), _defineProperty(_Listener, Process.UNCAUGHT_EXCEPTION, function (_config, client) {
  return function (error) {
    return client.Event.create({
      name: client.instance.get('name') + ' experienced an uncaught exception.',
      description: error.name + ': ' + error.message + '.',
      color: client.Color.RED,
      icon: client.Icon.ERROR
    });
  };
}), _defineProperty(_Listener, Process.UNHANDLED_REJECTION, function (_config, client) {
  return function (reason, promise) {
    return client.Event.create({
      name: client.instance.get('name') + ' experienced an unhandled rejection.',
      description: 'Reason: ' + reason + '.',
      color: client.Color.RED,
      icon: client.Icon.ERROR
    });
  };
}), _defineProperty(_Listener, Process.WARNING, function (_config, client) {
  return function () {
    return global.Promise.reoslve();
  };
}), _defineProperty(_Listener, Process.SIGHUP, function (_config, client) {
  return function () {
    logger.log('debug', 'Process received ' + Process.SIGHUP + '.');

    return client.Event.create({
      name: client.instance.get('name') + ' received ' + Process.SIGHUP + '.',
      color: client.Color.PURPLE,
      icon: client.Icon.SIGNAL
    });
  };
}), _defineProperty(_Listener, Process.SIGINT, function (_config, client) {
  return function () {
    logger.log('debug', 'Process received ' + Process.SIGINT + '.');

    return client.Event.create({
      name: client.instance.get('name') + ' received ' + Process.SIGINT + '.',
      color: client.Color.PURPLE,
      icon: client.Icon.SIGNAL
    }).then(function (_) {
      return client._agent.stop();
    }).then(function (_) {
      logger.log('debug', 'Agent has been stopped.');
    });
  };
}), _defineProperty(_Listener, Process.SIGTERM, function (_config, client) {
  return function () {
    logger.log('debug', 'Process received ' + Process.SIGTERM + '.');

    return client.Event.create({
      name: client.instance.get('name') + ' received ' + Process.SIGTERM + '.',
      color: client.Color.PURPLE,
      icon: client.Icon.SIGNAL
    }).then(function (_) {
      return client._agent.stop();
    }).then(function (_) {
      logger.log('debug', 'Agent has been stopped.');
    });
  };
}), _Listener);

var attach = attachToProcess(Listener, process);

module.exports = (_module$exports = {}, _defineProperty(_module$exports, Process.EXIT, attach(Process.EXIT)), _defineProperty(_module$exports, Process.UNCAUGHT_EXCEPTION, attach(Process.UNCAUGHT_EXCEPTION)), _defineProperty(_module$exports, Process.UNHANDLED_REJECTION, attach(Process.UNHANDLED_REJECTION)), _defineProperty(_module$exports, Process.WARNING, attach(Process.WARNING)), _defineProperty(_module$exports, Process.SIGHUP, attach(Process.SIGHUP)), _defineProperty(_module$exports, Process.SIGINT, attach(Process.SIGINT)), _defineProperty(_module$exports, Process.SIGTERM, attach(Process.SIGTERM)), _module$exports);