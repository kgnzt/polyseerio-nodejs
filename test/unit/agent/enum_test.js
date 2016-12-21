'use strict';

const should = require('should');

describe('Enum', () => {
  const Enum = require('../../../lib/agent/enum');

  describe('Fact', () => {
    const { Fact } = Enum;

    it('correctly defines ARCHITECTURE', () => {
      const { ARCHITECTURE } = Fact;
  
      ARCHITECTURE.should.eql('architecture');
    });

    it('correctly defines GID', () => {
      const { GID } = Fact;
  
      GID.should.eql('gid');
    });

    it('correctly defines LAUNCH_ARGUMENTS', () => {
      const { LAUNCH_ARGUMENTS } = Fact;
  
      LAUNCH_ARGUMENTS.should.eql('launch_arguments');
    });

    it('correctly defines NODE_VERSION', () => {
      const { NODE_VERSION } = Fact;
  
      NODE_VERSION.should.eql('node_version');
    });

    it('correctly defines PID', () => {
      const { PID } = Fact;
  
      PID.should.eql('pid');
    });

    it('correctly defines PLATFORM', () => {
      const { PLATFORM } = Fact;
  
      PLATFORM.should.eql('platform');
    });

    it('correctly defines TITLE', () => {
      const { TITLE } = Fact;
  
      TITLE.should.eql('title');
    });

    it('correctly defines UID', () => {
      const { UID } = Fact;
  
      UID.should.eql('uid');
    });

    it('correctly defines V8_VERSION', () => {
      const { V8_VERSION } = Fact;
  
      V8_VERSION.should.eql('v8_version');
    });
  });

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

    it('correctly defines STOP', () => {
      const { STOP } = Event;
  
      STOP.should.eql('stop');
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
