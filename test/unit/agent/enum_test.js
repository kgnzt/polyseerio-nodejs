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

    it('correctly defines CPU_COUNT', () => {
      const { CPU_COUNT } = Fact;
  
      CPU_COUNT.should.eql('cpu_count');
    });

    it('correctly defines ENDIANNESS', () => {
      const { ENDIANNESS } = Fact;
  
      ENDIANNESS.should.eql('endianness');
    });

    it('correctly defines FREE_MEMORY', () => {
      const { FREE_MEMORY } = Fact;
  
      FREE_MEMORY.should.eql('free_memory');
    });

    it('correctly defines GID', () => {
      const { GID } = Fact;
  
      GID.should.eql('gid');
    });

    it('correctly defines HOME_DIRECTORY', () => {
      const { HOME_DIRECTORY } = Fact;
  
      HOME_DIRECTORY.should.eql('home_directory');
    });

    it('correctly defines HOSTNAME', () => {
      const { HOSTNAME } = Fact;
  
      HOSTNAME.should.eql('hostname');
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

    it('correctly defines UPTIME', () => {
      const { UPTIME } = Fact;
  
      UPTIME.should.eql('uptime');
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

  describe('Process', () => {
    const { Process } = Enum;

    it('correctly defines SIGHUP', () => {
      const { SIGHUP } = Process;
  
      SIGHUP.should.eql('SIGHUP');
    });

    it('correctly defines SIGINT', () => {
      const { SIGINT } = Process;
  
      SIGINT.should.eql('SIGINT');
    });

    it('correctly defines SIGTERM', () => {
      const { SIGTERM } = Process;
  
      SIGTERM.should.eql('SIGTERM');
    });

    it('correctly defines EXIT', () => {
      const { EXIT } = Process;
  
      EXIT.should.eql('exit');
    });

    it('correctly defines UNCAUGHT_EXCEPTION', () => {
      const { UNCAUGHT_EXCEPTION } = Process;
  
      UNCAUGHT_EXCEPTION.should.eql('uncaughtException');
    });

    it('correctly defines UNHANDLED_REJECTION', () => {
      const { UNHANDLED_REJECTION } = Process;
  
      UNHANDLED_REJECTION.should.eql('unhandledRejection');
    });

    it('correctly defines WARNING', () => {
      const { WARNING } = Process;
  
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
