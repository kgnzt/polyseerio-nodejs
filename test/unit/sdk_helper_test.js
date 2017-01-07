'use strict';

const should = require('should'),
      sinon  = require('sinon');

describe('SDKHelper', () => {
  const Helper = require('../../lib/sdk/helper');

  describe('removeNonResolvingValues', () => {
    const { removeNonResolvingValues } = Helper;

    it('correctly removes values that don\'t resolve', () => {
      const map = new Map();

      const callable = sinon.spy();

      map.set('foo', 'bar');
      map.set('length', 200);
      map.set('good', true);
      map.set('callable', callable);

      const result = removeNonResolvingValues(map);

      result.size.should.eql(1);
      result.has('callable').should.eql(true);
      result.get('callable').should.eql(callable);
    });
  });

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

    it('simply returns default when no options passed', () => {
      const result = resolveEid();

      result.should.eql('development');
    });

    it('returns the eid in the options if present', () => {
      const options = {
              environment: 'zing'
            };

      const result = resolveEid(options);

      result.should.eql('zing');
    });
  });
});
