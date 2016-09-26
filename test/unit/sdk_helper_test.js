'use strict';

const should = require('should');

describe('SDKHelper', () => {
  const Helper = require('../../lib/sdk/helper');

  describe('reduceOptions', () => {
    const { reduceOptions } = Helper;

    it('correctly has options trump client options', () => {
      const options = {
              environment: 'foo'
            },
            copts = {
              environment: 'bar'
            };

      const result = reduceOptions(options, copts);

      result.should.have.property('environment');
      result.environment.should.eql('foo');
    });

    it('correctly includes defaults if present', () => {
      const options = {
              environment: 'foo'
            },
            copts = {
              environment: 'bar'
            },
            defaults = {
              alpha: 'beta'
            };

      const result = reduceOptions(options, copts, defaults);

      result.should.have.property('alpha');
      result.alpha.should.eql('beta');
    });

    it('complex example', () => {
      const options = {
              environment: 'foo',
              zing: 'zang'
            },
            copts = {
              environment: 'bar',
              dork: 'duck'
            },
            defaults = {
              alpha: 'beta',
              zing: 'peptide',
              dork: 'cork'
            };

      const result = reduceOptions(options, copts, defaults);

      result.should.eql({
        environment: 'foo',
        zing: 'zang',
        dork: 'duck',
        alpha: 'beta'
      });
    });
  });

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
