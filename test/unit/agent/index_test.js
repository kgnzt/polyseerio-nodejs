'use strict';

const should     = require('should'),
      sinon      = require('sinon'),
      proxyquire = require('proxyquire');

describe('Agent', () => {
  const ExecutorDouble = {
    execute: sinon.stub()
  };

  const Agent = proxyquire('../../../lib/agent', {
    './executor': ExecutorDouble
  });

  beforeEach(() => {
    ExecutorDouble.execute.reset();
  });

  describe('constructor', () => {
    it('throws a TypeError if client is not an instance of Client', () => {
      (function () {
        new Agent(1);
      }).should.throw('Must pass a Polyseer.io client to Agent.');
    });

    it('attaches the client to the agent instance', () => {
      const client = sinon.stub();

      const agent = new Agent(client);

      agent._client.should.eql(client);
    });

    it('defaults ._instance to null', () => {
      const agent = new Agent(sinon.stub());

      (agent._instance === null).should.eql(true);
    });
  });

  describe('start', () => {
    it('returns the client', () => {
      const client = sinon.stub(),
            agent = new Agent(client),
            instanceDouble = sinon.stub();

      ExecutorDouble.execute.returns(global.Promise.resolve(instanceDouble));

      return agent.start().
        should.be.fulfilled().
        then(result => {
          result.should.eql(client);
        });
    });

    it('sets the internal instance of the agent', () => {
      const client = sinon.stub(),
            agent = new Agent(client),
            instanceDouble = sinon.stub();

      ExecutorDouble.execute.returns(global.Promise.resolve(instanceDouble));

      return agent.start().
        should.be.fulfilled().
        then(result => {
          agent._instance.should.eql(instanceDouble);
        });
    });

    it('calls execute from the Executor correctly passing client and forward args', () => {
      const client = sinon.stub(),
            agent = new Agent(client);

      ExecutorDouble.execute.returns(global.Promise.resolve('foo'));

      return agent.start('alpha', 'beta', 'gamma', 11).
        should.be.fulfilled().
        then(result => {
          ExecutorDouble.execute.
            calledWithExactly(client, 'alpha', 'beta', 'gamma', 11).
            should.eql(true);
        });
    });
  });
});
