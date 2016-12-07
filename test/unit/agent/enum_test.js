'use strict';

const should = require('should');

describe('Enum', () => {
  const Enum = require('../../../lib/agent/enum');

  describe('Expectation', () => {
    const { Expectation } = Enum;

    it('correctly defines IS_AILVE', () => {
      const { IS_ALIVE } = Expectation;
  
      IS_ALIVE.should.eql('is_alive');
    });
  });

  describe('Event', () => {
    const { Event } = Enum;

    it('correctly defines START', () => {
      const { START } = Event;
  
      START.should.eql('start');
    });
  });

  describe('Signal', () => {
    const { Signal } = Enum;

    it('correctly defines SIGHUP', () => {
      const { SIGHUP } = Signal;
  
      SIGHUP.should.eql('SIGHUP');
    });

    it('correctly defines SIGINT', () => {
      const { SIGINT } = Signal;
  
      SIGINT.should.eql('SIGINT');
    });

    it('correctly defines SIGTERM', () => {
      const { SIGTERM } = Signal;
  
      SIGTERM.should.eql('SIGTERM');
    });
  });

  describe('ProcessEvent', () => {
    const { ProcessEvent } = Enum;

    it('correctly defines EXIT', () => {
      const { EXIT } = ProcessEvent;
  
      EXIT.should.eql('exit');
    });

    it('correctly defines UNCAUGHT_EXCEPTION', () => {
      const { UNCAUGHT_EXCEPTION } = ProcessEvent;
  
      UNCAUGHT_EXCEPTION.should.eql('uncaughtException');
    });

    it('correctly defines UNHANDLED_REJECTION', () => {
      const { UNHANDLED_REJECTION } = ProcessEvent;
  
      UNHANDLED_REJECTION.should.eql('unhandledRejection');
    });

    it('correctly defines WARNING', () => {
      const { WARNING } = ProcessEvent;
  
      WARNING.should.eql('warning');
    });
  });

  describe('Metric', () => {
    const { Metric } = Enum;

    it('correctly defines MEMORY', () => {
      const { MEMORY } = Metric;
  
      MEMORY.should.eql('memory');
    });

    it('correctly defines CPU', () => {
      const { CPU } = Metric;
  
      CPU.should.eql('cpu');
    });

    it('correctly defines UPTIME', () => {
      const { UPTIME } = Metric;
  
      UPTIME.should.eql('uptime');
    });
  });
});
