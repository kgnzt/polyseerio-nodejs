'use strict';

const should = require('should'),
      sinon  = require('sinon');

describe('Agent EventHandler', () => {
  const { createInstance } = require('../../helper');

  const Interface = require('../../../../lib/agent/handler/interface');

  const Handler = require('../../../../lib/agent/handler/event');

  describe('start', () => {
    const { start } = Handler;

    it('creates an event for the agent being started', () => {
      const client = {
              Event: {
                create: sinon.stub()
              },
              instance: createInstance({
                name: 'foo'
              }),
              Color: {
                GREEN: 'green'
              },
              Icon: {
                CHAIN: 'chain'
              }
            };

      client.Event.create.withArgs({
        name: 'foo agent has started.',
        color: 'green',
        icon: 'chain'
      }).returns(global.Promise.resolve('result_double'));

      return start({}, client).should.be.fulfilled().
        then(result => {
          result.should.eql('result_double');
        });
    });
  });

  describe('stop', () => {
    const stop = Handler.stop[Interface.TEARDOWN];

    it('creates an event for the agent being stoped', () => {
      const client = {
              Event: {
                create: sinon.stub()
              },
              instance: createInstance({
                name: 'foo'
              }),
              Color: {
                ORANGE: 'orange'
              },
              Icon: {
                CHAIN_BROKEN: 'chain-broken'
              }
            };

      client.Event.create.returns(global.Promise.resolve('result_double'));

      return stop({}, client).should.be.fulfilled().
        then(result => {
          client.Event.create.calledWithExactly({
            name: 'foo agent has stopped.',
            color: 'orange',
            icon: 'chain-broken'
          }).should.eql(true);

          result.should.eql('result_double');
        });
    });
  });
});
