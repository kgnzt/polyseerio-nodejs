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
  });

  describe('start', () => {
    it('calls execute from the Executor correctly passing client and forward args', () => {
      const client = sinon.stub(),
            agent = new Agent(client);

      ExecutorDouble.execute.returns(global.Promise.resolve('foo'));

      return agent.start('alpha', 'beta', 'gamma', 11).
        should.be.fulfilled().
        then(result => {
          result.should.eql('foo');
          ExecutorDouble.execute.
            calledWithExactly(client, 'alpha', 'beta', 'gamma', 11).
            should.eql(true);
        });
    });
  });
});
