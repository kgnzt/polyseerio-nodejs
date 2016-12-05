'use strict';

const should = require('should'),
      sinon  = require('sinon');

describe('Agent MetricHandler', () => {
  const Handler = require('../../../../lib/agent/handler/metric');

  describe('memory', () => {
    const { memory } = Handler;

    it('sends memory usage', () => {
      // wait for additionso of metric add to instance that will push metrics
      // alongside heartbeats instead of making .gauge calls.
    });
  });
});
