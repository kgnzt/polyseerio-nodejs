'use strict';

const should = require('should'),
      sinon  = require('sinon');

describe('save', () => {
  const { createRequestMock } = require('./helper');

  const save = require('../../../../lib/sdk/instance/save');

  it('makes the correct api call to create', () => {
    const instance = {
            id: 1,
            resource: 'events',
            _request: createRequestMock(),
            eid: 'waterworld',
            isNew: true,
            toJSON: sinon.stub()
          },
          resultDouble = sinon.stub();

    instance.toJSON.returns({ ding: 'dong' });
    instance._request.post.returns(global.Promise.resolve(resultDouble));

    return save(instance).should.be.fulfilled().
      then(_ => {
        instance._request.post.calledWithExactly({
          uri: '/environments/waterworld/events',
          body: {
            ding: 'dong'
          }
        }).should.eql(true);
      });
  });
});
