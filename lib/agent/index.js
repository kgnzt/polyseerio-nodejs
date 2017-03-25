'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DefaultConfig = require('./default_config'),
    lodash = require('lodash'),
    HandlerMap = require('./handler'),
    logger = require('../logger'),
    EventEmitter = require('events'),
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
 * Agent events.
 */
var Event = {
  START: 'agent-start',
  STOP: 'agent-stop'
};

/**
 * The Polyseer.io agent.
 */

var Agent = function (_EventEmitter) {
  _inherits(Agent, _EventEmitter);

  /**
   * @param {Client}
   */
  function Agent(client) {
    _classCallCheck(this, Agent);

    var _this = _possibleConstructorReturn(this, (Agent.__proto__ || Object.getPrototypeOf(Agent)).call(this));

    if (lodash.isNil(client) || !lodash.isObject(client)) {
      throw new TypeError('Must pass a Polyseer.io client to Agent.');
    }

    _this._client = client;
    _this._instance = null;
    _this._start_args = null;
    return _this;
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
      var _this2 = this;

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

          return setup(_this2._client, options).then(function (instance) {
            logger.log('info', 'Agent setup success.', meta);
            _this2._instance = instance; // TODO: is this the right place for this?

            clearLoop(loop);

            _this2.emit(Event.START);

            return resolve(_this2._client);
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
      var _this3 = this;

      return teardown(this._client, this._handler_options).then(function (_) {
        _this3.emit(Event.STOP);

        return _this3._client;
      });
    }
  }]);

  return Agent;
}(EventEmitter);

Object.assign(Agent, {
  Event: Event
});

module.exports = Agent;