'use strict';

const should                = require('should'),
      lodash                = require('lodash'),
      sinon                 = require('sinon'),
      proxyquire            = require('proxyquire'),
      { createRequestMock } = require('./helper');

/**
 * Returns an Agent mock.
 *
 * @return {sinon.stub}
 */
function createAgentMock () {
  return {
    start: sinon.stub()
  };
}

/**
 * Agent double used as standin through proxyquire.
 */
class AgentDouble {
  constructor (...args) {
    this.args = args;
  }

  start (...args) {
    return global.Promise.resolve(args);
  }
}

describe('Client', () => {
  const Client = proxyquire('../../lib/client', {
    './agent': AgentDouble
  });

  describe('constructor', () => {
    it('throws a TypeError if a cid is not passed', () => {
      (function () {
        new Client(undefined, {});
      }).should.throw('Cannot create a Client instance without passing a unique client id (cid).');
    });

    it('throws a TypeError if an instance of request is not passed', () => {
      (function () {
        new Client(1, {});
      }).should.throw('Cannot create an instance of Client without passing an instance of request to the options.');
    });

    it('defaults the agent to null', () => {
      const client =new Client(1, {
        request: createRequestMock()
      });

      lodash.isNull(client._agent).should.eql(true);
    });
  });

  describe('startAgent', () => {
    it('throws if agent has already been started', () => {
      const client = new Client(0, {
        request: createRequestMock()
      });

      client._agent = createAgentMock();

      return client.startAgent().should.be.
        rejectedWith('Agent has already been started for this client.');
    });

    it('creates an Agent instance, calls start and forwards arguments', () => {
      const client = new Client(0, {
        request: createRequestMock()
      });

      const agentArgs = ['a', 'foo', 'b'];

      return client.startAgent(...agentArgs).should.be.fulfilled().
        then(result => {
          client._agent.args.should.eql([client]);
          result.should.eql(agentArgs);
        });
    });
  });
});
