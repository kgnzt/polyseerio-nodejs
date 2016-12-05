'use strict';

const should = require('should'),
      sinon  = require('sinon');

describe('Agent EventHandler', () => {
  const Handler = require('../../../../lib/agent/handler/event');

  describe('start', () => {
    const { start } = Handler;

    it('creates an event regarding the instance being started', () => {
      const client = {
              Event: {
                create: sinon.stub()
              }
            },
            instance = {
              name: 'foo'
            };

      client.Event.create.withArgs({
        name: 'foo agent has started.',
        color: 'green',
        icon: 'check'
      }).returns(global.Promise.resolve('result_double'));

      return start(client, instance).should.be.fulfilled().
        then(result => {
          result.should.eql('result_double');
        });
    });
  });
});
