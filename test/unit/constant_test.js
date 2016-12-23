'use strict';

const should = require('should');

describe('Constant', () => {
  const Constant = require('../../lib/constant');

  it('correctly defines ACCESS_TOKEN_HEADER ', () => {
    const { ACCESS_TOKEN_HEADER } = Constant;

    ACCESS_TOKEN_HEADER.should.eql('X-AUTH-HEADER');
  });

  it('correctly defines DEFAULT_API_BASE_URL ', () => {
    const { DEFAULT_API_BASE_URL } = Constant;

    DEFAULT_API_BASE_URL.should.eql('api.polyseer.io/polyseer');
  });

  it('correctly defines DEFAULT_API_PROTOCOL ', () => {
    const { DEFAULT_API_PROTOCOL } = Constant;

    DEFAULT_API_PROTOCOL.should.eql('https://');
  });

  it('correctly defines DEFAULT_API_VERSION ', () => {
    const { DEFAULT_API_VERSION } = Constant;

    DEFAULT_API_VERSION.should.eql('v1');
  });

  it('correctly defines DEFAULT_ENV ', () => {
    const { DEFAULT_ENV } = Constant;

    DEFAULT_ENV.should.eql('NODE_ENV');
  });

  it('correctly defines DEFAULT_ENVIRONMENT ', () => {
    const { DEFAULT_ENVIRONMENT } = Constant;

    DEFAULT_ENVIRONMENT.should.eql('development');
  });

  it('correctly defines DEFAULT_HEARTBEAT_DELAY ', () => {
    const { DEFAULT_HEARTBEAT_DELAY } = Constant;

    DEFAULT_HEARTBEAT_DELAY.should.eql(30000);
  });

  it('correctly defines DEFAULT_LOG_LEVEL ', () => {
    const { DEFAULT_LOG_LEVEL } = Constant;

    DEFAULT_LOG_LEVEL.should.eql('error');
  });

  it('correctly defines DEFAULT_TIMEOUT ', () => {
    const { DEFAULT_TIMEOUT } = Constant;

    DEFAULT_TIMEOUT.should.eql(10000);
  });

  it('correctly defines DEFAULT_TOKEN_ENV ', () => {
    const { DEFAULT_TOKEN_ENV } = Constant;

    DEFAULT_TOKEN_ENV.should.eql('POLYSEERIO_TOKEN');
  });
});
