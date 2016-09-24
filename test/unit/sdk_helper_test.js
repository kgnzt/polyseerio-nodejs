'use strict';

const should = require('should');

describe('SDKHelper', () => {
  const Helper = require('../../lib/sdk/helper');

  describe('resolveEid', () => {
    const { resolveEid } = Helper;

    it('returns the eid in the options if present', () => {
      const options = {
              environment: 'zing'
            };

      const result = resolveEid(options);

      result.should.eql('zing');
    });
  });
});
