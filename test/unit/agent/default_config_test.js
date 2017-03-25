'use strict';

const should = require('should');

describe('DefaultAgentConfig', () => {
  const config = require('../../../lib/agent/default_config');

  it('has the correct agent_retry', () => {
    const { agent_retry } = config;

    agent_retry.should.eql(60000);
  });

  it('has the correct attach', () => {
    const { attach } = config;

    attach.should.eql(true);
  });

  it('has the correct group', () => {
    const { group } = config;

    group.should.eql('agent');
  });

  it('has the correct direction', () => {
    const { direction } = config;

    direction.should.eql('inbound');
  });

  it('has the correct subtype', () => {
    const { subtype } = config;

    subtype.should.eql('long_running');
  });
});
