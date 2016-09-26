'use strict';

const should = require('should'),
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
  });
});
