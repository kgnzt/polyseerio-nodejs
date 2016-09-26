'use strict';

const should = require('should');

describe('index', () => {
  const index = require('../../index'),
        factory = require('../../lib');

  it('exports the factory', () => {
    index.should.eql(factory);
  });
});
