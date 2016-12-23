'use strict';

const should = require('should'),
      lodash = require('lodash');

describe('Base', () => {
  const Base = require('../../../lib/resource/base');

  describe('constructor', () => {
    it('can construct with no arguments', () => {
      (function () {
        new Base();
      }).should.not.throw();
    });

    it('sets the attributes passed as _attributes', () => {
      const attributes = {
        foo: 'bar'
      };

      const instance = new Base(attributes);

      instance._attributes.should.eql(attributes);
    });

    it('will set passed eid', () => {
      const attributes = {
        eid: 'alpha'
      };

      const instance = new Base(attributes);

      instance.eid.should.eql('alpha');
    });

    it('correct default eid', () => {
      const instance = new Base();

      instance.eid.should.eql('development');
    });
  });
});
