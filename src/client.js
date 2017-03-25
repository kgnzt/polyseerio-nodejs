'use strict';

const lodash       = require('lodash'),
      Enum         = require('./enum'),
      Agent        = require('./agent'),
      EventEmitter = require('events');

/**
 * Reserved resource attribute names / paths.
 */
const RESERVED = [
  '_request'
];

/**
 * Default client options.
 */
const DEFAULT_OPTIONS = {
  request: null,
  resources: {}
};

/**
 * Client events.
 */
const Event = {
  AGENT_START: Agent.Event.START,
  AGENT_STOP:  Agent.Event.STOP
};

/**
 * The Polyseer.io client.
 */
class Client extends EventEmitter {
  /**
   * @param {object} options
   * @param {object} options.request
   */
  constructor (cid, options = {}) {
    super();

    options = Object.assign({}, DEFAULT_OPTIONS, options);

    if (lodash.isNil(cid)) {
      throw new TypeError('Cannot create a Client instance without passing a unique client id (cid).');
    }

    if (options.request === null) {
      throw new TypeError(`Cannot create an instance of Client without passing an instance of request to the options.`);
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
   * TODO: test event emit / attach / forward
   *
   * @param {...}
   * @return {Promise}
   */
  startAgent (...args) {
    if (!lodash.isNull(this._agent)) {
      return global.Promise.reject(new Error('Agent has already been started for this client.'));
    }

    this._agent = new Agent(this);

    // forward agent events as client events.
    [Event.AGENT_START, 
     Event.AGENT_STOP
    ].forEach(eventName => {
      this._agent.on(eventName, (...args) => {
        this.emit(eventName, ...args);
      });
    });

    return this._agent.start(...args);
  }

  /**
   * Stop the agent.
   *
   * TODO: unit-test
   *
   * @param {...}
   * @return {Promise}
   */
  stopAgent (...args) {
    if (lodash.isNull(this._agent)) {
      return global.Promise.reject(new Error('No agent to stop.'));
    }

    return this._agent.stop(...args);
  }

  /**
   * Return the currently deduced environment.
   */
  getCurrentEnvironment () {
    const { Environment } = this;

    return Environment.findByName();
  }
}

Object.assign(Client, {
  Event
});

module.exports = Client;
