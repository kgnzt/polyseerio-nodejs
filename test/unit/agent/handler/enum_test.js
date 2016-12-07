'use strict';

const should = require('should');

describe('Enum', () => {
  const Interface = require('../../../../lib/agent/handler/interface');

  it('correctly defines SETUP', () => {
    const { SETUP } = Interface;

    const label = SETUP.toString();
  
    label.should.eql('Symbol(agent-handler-setup)');
  });

  it('correctly defines TEARDOWN', () => {
    const { TEARDOWN } = Interface;

    const label = TEARDOWN.toString();
  
    label.should.eql('Symbol(agent-handler-teardown)');
  });
});
