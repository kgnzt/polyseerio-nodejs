'use strict';

const should = require('should');

describe('UrlBuilder', () => {
  const UrlBuilder = require('../../lib/url_builder');

  describe('RoutableResource', () => {
    const { RoutableResources } = UrlBuilder;

    it('includes the correct routable resources', () => {
      RoutableResources.should.containDeep([
        'alerts',
        'environment-messages',
        'events',
        'expectations',
        'instances',
        'tasks'
      ]);
    });
  });

  describe('getResourcePath', () => {
    const { getResourcePath } = UrlBuilder;

    describe('options', () => {
      it('correctly appends an id if passed', () => {
        const result = getResourcePath('events', {
          eid: 'zoo',
          id: 'foo'
        });

        result.should.eql('/environments/zoo/events/foo');
      });
    });

    describe('non routable resources', () => {
      it('correctly handles environments', () => {
        const result = getResourcePath('environments');

        result.should.eql('/environments');
      });

      it('correctly handles logic-blocks', () => {
        const result = getResourcePath('logic-blocks');

        result.should.eql('/logic-blocks');
      });
    });

    describe('routable resources', () => {
      it('throws when a routable resource passed without an eid', () => {
        (function () {
          getResourcePath('events', {foo: 'bar'});
        }).should.throw('Cannot get routable resource path for events, without passing an eid to the options.');
      });

      it('correctly handles environment-messages', () => {
        const result = getResourcePath('environment-messages', {eid: 'foo'});

        result.should.eql('/environments/foo/messages');
      });

      it('correctly handles events', () => {
        const result = getResourcePath('events', {eid: 'foo'});

        result.should.eql('/environments/foo/events');
      });

      it('correctly handles instances', () => {
        const result = getResourcePath('instances', {eid: 'foo'});

        result.should.eql('/environments/foo/instances');
      });
    });
  });

  describe('getBaseUrl', () => {
    const { getBaseUrl } = UrlBuilder;

    it('returns the correctly formatted url', () => {
      const base = 'api.foo/bar',
            protocol = 'https://',
            version = 'v3';

       const result = getBaseUrl(base, protocol, version);

      result.should.eql('https://api.foo/bar/v3');
    });

    it('defaults the base correctly', () => {
      const protocol = 'ws://',
            version = 'v3';

       const result = getBaseUrl(undefined, protocol, version);

      result.should.eql('ws://api.polyseer.io/polyseer/v3');
    });

    it('defaults the protocol correctly', () => {
      const base = 'api.foo/bar',
            version = 'v3';

       const result = getBaseUrl(base, undefined, version);

      result.should.eql('http://api.foo/bar/v3');
    });

    it('defaults the version correctly', () => {
      const base = 'api.foo/bar',
            protocol = 'https://';

       const result = getBaseUrl(base, protocol);

      result.should.eql('https://api.foo/bar/v1');
    });
  });
});
