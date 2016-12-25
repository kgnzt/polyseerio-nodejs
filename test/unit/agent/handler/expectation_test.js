'use strict';

const should = require('should'),
      sinon  = require('sinon');

describe('Agent ExpectationHandler', () => {
  const Handler = require('../../../../lib/agent/handler/expectation');

  describe('is_alive', () => {
    const { is_alive } = Handler;

    it('ensures that there is an expectation that checks this instance is alive', () => {
      const client = {
              Expectation: {
                create: sinon.stub()
              },
              instance: {
                get: sinon.stub()
              },
              Type: {
                INSTANCE: 'instance'
              },
              Determiner: {
                ONE: 'one'
              }
            };

      client.Expectation.create.returns(global.Promise.resolve('result_double'));
      client.instance.get.withArgs('id').returns(100);
      client.instance.get.withArgs('name').returns('foo');

      return is_alive({}, client).should.be.fulfilled().
        then(result => {
          const data = client.Expectation.create.args[0][0];

          data.name.should.eql('foo instance is alive.');
          data.description.should.eql('Agent created expectation.');
          data.is_on.should.eql(true);
          data.determiner.should.eql('one');
          data.subject.should.eql('instance');
          data.subjects.should.eql([100]);
          data.is_expected.should.eql(true);
          data.logic.should.eql({
            "===": [
              {
                "pointer": "heartbeat_status"
              },
              "beating"
            ]
          });

          result.should.eql('result_double');
        });
    });
  });
});
