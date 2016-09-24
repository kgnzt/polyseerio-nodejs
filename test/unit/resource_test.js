'use strict';

const should = require('should');

describe('Resource', () => {
  const Resource = require('../../lib/resource');

  it('correctly defines ALERT', () => {
    const { ALERT } = Resource;

    ALERT.should.eql('alerts');
  });

  it('correctly defines CHANNEL', () => {
    const { CHANNEL } = Resource;

    CHANNEL.should.eql('channels');
  });

  it('correctly defines ENVIRONMENT', () => {
    const { ENVIRONMENT } = Resource;

    ENVIRONMENT.should.eql('environments');
  });

  it('correctly defines ENVIRONMENT_MESSAGE', () => {
    const { ENVIRONMENT_MESSAGE } = Resource;

    ENVIRONMENT_MESSAGE.should.eql('environment-messages');
  });

  it('correctly defines EVENT', () => {
    const { EVENT } = Resource;

    EVENT.should.eql('events');
  });

  it('correctly defines EXPECTATION', () => {
    const { EXPECTATION } = Resource;

    EXPECTATION.should.eql('expectations');
  });

  it('correctly defines INSTANCE', () => {
    const { INSTANCE } = Resource;

    INSTANCE.should.eql('instances');
  });

  it('correctly defines LOGIC_BLOCK', () => {
    const { LOGIC_BLOCK } = Resource;

    LOGIC_BLOCK.should.eql('logic-blocks');
  });

  it('correctly defines MEMBER', () => {
    const { MEMBER } = Resource;

    MEMBER.should.eql('members');
  });

  it('correctly defines MESSAGE', () => {
    const { MESSAGE } = Resource;

    MESSAGE.should.eql('messages');
  });

  it('correctly defines SETTING', () => {
    const { SETTING } = Resource;

    SETTING.should.eql('settings');
  });

  it('correctly defines TASK', () => {
    const { TASK } = Resource;

    TASK.should.eql('tasks');
  });
});
