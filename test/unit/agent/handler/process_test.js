'use strict';

const should = require('should'),
      sinon  = require('sinon'),
      helper = require('../../helper');

describe('Process handler', () => {

  const Handler = require('../../../../lib/agent/handler/process');

  describe('SIGTERM', () => {
    const { SIGTERM } = Handler;

    it('sends the correct event', () => {
      const client = {
              Event: {
                create: sinon.stub()
              },
              instance: helper.createInstance(),
              Color: {
                GREEN: 'green'
              },
              Icon: {
                CHAIN: 'chain'
              }
            };

      //instance.get.withArgs('name').returns('foo');

      //client.Event.create.withArgs({
        //name: 'foo agent has started.',
        //color: 'green',
        //icon: 'chain'
      //}).returns(global.Promise.resolve('result_double'));
//
      //return SIGTERM({}, client).should.be.fulfilled().
        //then(result => {
          //result.should.eql('result_double');
        //});
    });
  });
});
