'use strict';

const should = require('should'),
      lodash = require('lodash'),
      sinon = require('sinon');

/**
 * Returns a request mock.
 *
 * @return {sinon.stub}
 */
function createRequestMock () {
  return sinon.stub();
}

describe('Client', () => {
  const Client = require('../../lib/client');

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
    });

    it('throws if agent has already been started', () => {
    });
  });
});
