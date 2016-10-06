'use strict';

const should = require('should');

describe('DefinitionConstant', () => {
  const DefinitionConstant = require('../../../lib/resource/definition_constant');

  it('correctly defines STATIC ', () => {
    const { STATIC } = DefinitionConstant;

    (typeof STATIC === 'symbol').should.eql(true);
  });

  it('correctly defines METHOD ', () => {
    const { METHOD } = DefinitionConstant;

    (typeof METHOD === 'symbol').should.eql(true);
  });
});
