'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = require('../client'),
    DefaultConfig = require('./default_config'),
    lodash = require('lodash'),
    HandlerMap = require('./handler'),
    logger = require('../logger'),
    logAndReject = logger.logAndReject,
    _require = require('../helper'),
    clearLoop = _require.clearLoop,
    loopPromise = _require.loopPromise,
    _require2 = require('./helper'),
    filterHandlers = _require2.filterHandlers,
    _require3 = require('./executor'),
    setup = _require3.setup,
    teardown = _require3.teardown;

/**
 * The Polyseer.io agent.
 */

var Agent = function () {
  /**
   * @param {Client}
   */
  function Agent(client) {
    _classCallCheck(this, Agent);

    if (lodash.isNil(Client) || !lodash.isObject(client)) {
      throw new TypeError('Must pass a Polyseer.io client to Agent.');
    }

    this._client = client;
    this._instance = null;
    this._start_args = null;
  }

  /**
   * Start the agent.
   *
   * @param {object}
   * @return {Promise}
   */


  _createClass(Agent, [{
    key: 'start',
    value: function start(options) {
      var _this = this;

      options = lodash.defaultsDeep({}, options, DefaultConfig);

      var handlerOptions = filterHandlers(lodash.pick(options, lodash.keys(HandlerMap)));

      options.handlers = handlerOptions;
      this._handler_options = handlerOptions;

      return new global.Promise(function (resolve, reject) {
        var attempt = 0;

        var loop = loopPromise(function () {
          var meta = {
            attempt: attempt += 1
          };

          logger.log('info', 'Agent setup attempt.', meta);

          return setup(_this._client, options).then(function (instance) {
            logger.log('info', 'Agent setup success.', meta);
            _this._instance = instance; // TODO: is this the right place for this?

            clearLoop(loop);

            return resolve(_this._client);
          }).catch(function (error) {
            logger.log('error', 'Agent setup failed. Will retry in ' + options.agent_retry + ' ms.', meta);

            return logAndReject(error);
          });
        }, {
          delay: options.agent_retry
        });
      });
    }

    /**
     * Gracefully stop the agent.
     *
     * @return {Promise}
     */

  }, {
    key: 'stop',
    value: function stop() {
      var _this2 = this;

      return teardown(this._client, this._handler_options).then(function (_) {
        return _this2._client;
      });
    }
  }]);

  return Agent;
}();

module.exports = Agent;