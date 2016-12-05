'use strict';

const should = require('should'),
      lodash = require('lodash');

describe('Factory', () => {
  const factory = require('../../lib');

  describe('resolveToken', () => {
    const { resolveToken } = factory;

    it('returns the token in the passed options if its not nil', () => {
      const result = resolveToken({
        token: 'something-special'
      });

      result.should.eql('something-special');
    });

    it('returns the env token if token nil but found in env vars', () => {
      process.env.GOOGOO = 'dingo';

      const result = resolveToken({
        token: null,
        token_env: 'GOOGOO'
      });

      result.should.eql('dingo');

      delete process.env.GOOGOO;
    });

    it('returns null if the token in null', () => {
      const result = resolveToken({
        token: null
      });

      lodash.isNull(result).should.eql(true);
    });

    it('returns null if the token in undefined', () => {
      const result = resolveToken({
        token: undefined
      });

      lodash.isNull(result).should.eql(true);
    });
  });

  describe('RequiredResources', () => {
    const { RequiredResources } = factory;

    it('includes the correct required resource sdks', () => {
      RequiredResources.should.containDeep([
        'alerts',
        'channels',
        'environments',
        'events',
        'expectations',
        'instances',
        'logic-blocks',
        'members',
        'settings',
        'tasks'
      ]);
    });
  });

  describe('ClientResourcePaths', () => {
    const { ClientResourcePaths } = factory;

    it('correctly defines alerts path', () => {
      const path = ClientResourcePaths.alerts;

      path.should.eql('Alert');
    });

    it('correctly defines channels path', () => {
      const path = ClientResourcePaths.channels;

      path.should.eql('Channel');
    });

    it('correctly defines environements path', () => {
      const path = ClientResourcePaths.environments;

      path.should.eql('Environment');
    });

    it('correctly defines events path', () => {
      const path = ClientResourcePaths.events;

      path.should.eql('Event');
    });

    it('correctly defines expectations path', () => {
      const path = ClientResourcePaths.expectations;

      path.should.eql('Expectation');
    });

    it('correctly defines instances path', () => {
      const path = ClientResourcePaths.instances;

      path.should.eql('Instance');
    });

    it('correctly defines logic-blocks path', () => {
      const path = ClientResourcePaths['logic-blocks'];

      path.should.eql('LogicBlock');
    });

    it('correctly defines members path', () => {
      const path = ClientResourcePaths.members;

      path.should.eql('Member');
    });

    it('correctly defines settings path', () => {
      const path = ClientResourcePaths.settings;

      path.should.eql('Settings');
    });

    it('correctly defines tasks path', () => {
      const path = ClientResourcePaths.tasks;

      path.should.eql('Task');
    });
  });

  it('throws a TypeError without a token', () => {
    (function () {
      factory({ token_env: 'ZINGZANG' });
    }).should.throw('Could not find an access token. None was passed and none could be found in the environment variable: ZINGZANG.');
  });
});
