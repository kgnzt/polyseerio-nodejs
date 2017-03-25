'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var lodash = require('lodash'),
    Enum = require('./enum'),
    Agent = require('./agent'),
    EventEmitter = require('events');

/**
 * Reserved resource attribute names / paths.
 */
var RESERVED = ['_request'];

/**
 * Default client options.
 */
var DEFAULT_OPTIONS = {
  request: null,
  resources: {}
};

/**
 * Client events.
 */
var Event = {
  AGENT_START: Agent.Event.START,
  AGENT_STOP: Agent.Event.STOP
};

/**
 * The Polyseer.io client.
 */

var Client = function (_EventEmitter) {
  _inherits(Client, _EventEmitter);

  /**
   * @param {object} options
   * @param {object} options.request
   */
  function Client(cid) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Client);

    var _this = _possibleConstructorReturn(this, (Client.__proto__ || Object.getPrototypeOf(Client)).call(this));

    options = Object.assign({}, DEFAULT_OPTIONS, options);

    if (lodash.isNil(cid)) {
      throw new TypeError('Cannot create a Client instance without passing a unique client id (cid).');
    }

    if (options.request === null) {
      throw new TypeError('Cannot create an instance of Client without passing an instance of request to the options.');
    }

    Object.assign(_this, lodash.omit(options.resources));

    _this._cid = cid;
    _this._request = options.request;
    _this._agent = null;
    _this.instance = null; // TODO: unit-test add getter and setter (consider attaching to agent?)
    Object.assign(_this, Enum);
    return _this;
  }

  /**
   * Start the agent.
   *
   * TODO: test event emit / attach / forward
   *
   * @param {...}
   * @return {Promise}
   */


  _createClass(Client, [{
    key: 'startAgent',
    value: function startAgent() {
      var _this2 = this,
          _agent;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (!lodash.isNull(this._agent)) {
        return global.Promise.reject(new Error('Agent has already been started for this client.'));
      }

      this._agent = new Agent(this);

      // forward agent events as client events.
      [Event.AGENT_START, Event.AGENT_STOP].forEach(function (eventName) {
        _this2._agent.on(eventName, function () {
          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          _this2.emit.apply(_this2, [eventName].concat(args));
        });
      });

      return (_agent = this._agent).start.apply(_agent, args);
    }

    /**
     * Stop the agent.
     *
     * TODO: unit-test
     *
     * @param {...}
     * @return {Promise}
     */

  }, {
    key: 'stopAgent',
    value: function stopAgent() {
      var _agent2;

      if (lodash.isNull(this._agent)) {
        return global.Promise.reject(new Error('No agent to stop.'));
      }

      return (_agent2 = this._agent).stop.apply(_agent2, arguments);
    }

    /**
     * Return the currently deduced environment.
     */

  }, {
    key: 'getCurrentEnvironment',
    value: function getCurrentEnvironment() {
      var Environment = this.Environment;


      return Environment.findByName();
    }
  }]);

  return Client;
}(EventEmitter);

Object.assign(Client, {
  Event: Event
});

module.exports = Client;