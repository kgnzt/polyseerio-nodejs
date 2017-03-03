'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var lodash = require('lodash'),
    Enum = require('./enum'),
    Agent = require('./agent');

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
 * The Polyseer.io client.
 */

var Client = function () {
  /**
   * @param {object} options
   * @param {object} options.request
   */
  function Client(cid) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Client);

    options = Object.assign({}, DEFAULT_OPTIONS, options);

    if (lodash.isNil(cid)) {
      throw new TypeError('Cannot create a Client instance without passing a unique client id (cid).');
    }

    if (options.request === null) {
      throw new TypeError('Cannot create an instance of Client without passing an instance of request to the options.');
    }

    Object.assign(this, lodash.omit(options.resources));

    this._cid = cid;
    this._request = options.request;
    this._agent = null;
    this.instance = null; // TODO: unit-test add getter and setter (consider attaching to agent?)
    Object.assign(this, Enum);
  }

  /**
   * Start the agent.
   *
   * @param {...}
   * @return {Promise}
   */


  _createClass(Client, [{
    key: 'startAgent',
    value: function startAgent() {
      var _agent;

      if (!lodash.isNull(this._agent)) {
        return global.Promise.reject(new Error('Agent has already been started for this client.'));
      }

      this._agent = new Agent(this);

      return (_agent = this._agent).start.apply(_agent, arguments);
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
}();

module.exports = Client;