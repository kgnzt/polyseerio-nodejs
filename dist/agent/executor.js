'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var lodash = require('lodash'),
    co = require('co'),
    DefaultConfig = require('./default_config'),
    HandlerMap = require('./handler'),
    logger = require('../logger'),
    _require = require('../enum'),
    Strategy = _require.Strategy,
    logAndReject = logger.logAndReject,
    _require2 = require('../resource/routine'),
    upsert = _require2.upsert,
    _require3 = require('./helper'),
    filterHandlers = _require3.filterHandlers,
    resolveName = _require3.resolveName,
    teardownWithHandler = _require3.teardownWithHandler,
    setupWithHandler = _require3.setupWithHandler;

/**
 * Fulfills an agent configuration.
 *
 * @param {Client}
 * @param {object}
 * @return {Promise}
 */
function setup(client, options) {
  return co(regeneratorRuntime.mark(function _callee2() {
    var _this = this;

    var _ret;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            logger.log('debug', 'Setting up agent for client: ' + client._cid + '.');

            if (!options.attach) {
              _context2.next = 6;
              break;
            }

            return _context2.delegateYield(regeneratorRuntime.mark(function _callee() {
              var instance, name, setupHandler, setups;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      // resolve the instance
                      instance = null;
                      _context.t0 = options.attach_strategy;
                      _context.next = _context.t0 === Strategy.FALLBACK ? 4 : _context.t0 === Strategy.ID ? 10 : 15;
                      break;

                    case 4:
                      logger.log('debug', 'Resolving instance using fallback.');
                      name = resolveName(options);
                      _context.next = 8;
                      return upsert(client.Instance, { name: name });

                    case 8:
                      instance = _context.sent;
                      return _context.abrupt('break', 15);

                    case 10:
                      logger.log('debug', 'Resolving instance using primary id.', {
                        id: options.id
                      });
                      _context.next = 13;
                      return client.Instance.find_by_id(options.id);

                    case 13:
                      instance = _context.sent;
                      return _context.abrupt('break', 15);

                    case 15:

                      client.instance = instance;

                      // create a setup handler.
                      setupHandler = setupWithHandler(HandlerMap, client, options.handlers);

                      // gather and perform work.

                      setups = lodash.map(options.handlers, function (_, key) {
                        return setupHandler(key);
                      });
                      _context.next = 20;
                      return global.Promise.all(setups);

                    case 20:

                      logger.log('debug', 'Attempting to attach instance to polyseerio.', {
                        id: instance.id,
                        strategy: options.attach_strategy
                      });

                      // start monitoring.
                      _context.next = 23;
                      return instance.attach();

                    case 23:
                      return _context.abrupt('return', {
                        v: instance
                      });

                    case 24:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, _callee, _this);
            })(), 't0', 3);

          case 3:
            _ret = _context2.t0;

            if (!((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object")) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt('return', _ret.v);

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  })).catch(logAndReject);
}

/**
 * Tearsdown an client's agent.
 *
 * @param {Client}
 * @return {Promise}
 */
function teardown(client, handlerOptions) {
  return co(regeneratorRuntime.mark(function _callee3() {
    var teardownHandler, teardowns;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            logger.log('debug', 'Tearing down agent for client: ' + client._cid + '.');

            teardownHandler = teardownWithHandler(HandlerMap, client, handlerOptions);

            // gather and perform work.

            teardowns = lodash.map(handlerOptions, function (_, key) {
              return teardownHandler(key);
            });
            _context3.next = 5;
            return global.Promise.all(teardowns);

          case 5:
            _context3.next = 7;
            return client.instance.detach();

          case 7:
            return _context3.abrupt('return', client);

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  })).catch(logAndReject);
}

module.exports = {
  setup: setup,
  teardown: teardown
};