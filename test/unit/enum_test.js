'use strict';

const should = require('should');

describe('Enum', () => {
  const Enum = require('../../lib/enum');

  describe('Type', () => {
    const { Type } = Enum;

    it('correctly defines ALERT', () => {
      const { ALERT } = Type;
  
      ALERT.should.eql('alert');
    });

    it('correctly defines CHANNEL', () => {
      const { CHANNEL } = Type;
  
      CHANNEL.should.eql('channel');
    });

    it('correctly defines ENVIRONMENT', () => {
      const { ENVIRONMENT } = Type;
  
      ENVIRONMENT.should.eql('environment');
    });

    it('correctly defines EVENT', () => {
      const { EVENT } = Type;
  
      EVENT.should.eql('event');
    });

    it('correctly defines EXPECTATION', () => {
      const { EXPECTATION } = Type;
  
      EXPECTATION.should.eql('expectation');
    });

    it('correctly defines GAUGE', () => {
      const { GAUGE } = Type;
  
      GAUGE.should.eql('gauge');
    });

    it('correctly defines INSTANCE', () => {
      const { INSTANCE } = Type;
  
      INSTANCE.should.eql('instance');
    });

    it('correctly defines LOGIC_BLOCK', () => {
      const { LOGIC_BLOCK } = Type;
  
      LOGIC_BLOCK.should.eql('logic-block');
    });

    it('correctly defines MEMBER', () => {
      const { MEMBER } = Type;
  
      MEMBER.should.eql('member');
    });

    it('correctly defines MESSAGE', () => {
      const { MESSAGE } = Type;
  
      MESSAGE.should.eql('message');
    });

    it('correctly defines SETTING', () => {
      const { SETTING } = Type;
  
      SETTING.should.eql('setting');
    });

    it('correctly defines TASK', () => {
      const { TASK } = Type;
  
      TASK.should.eql('task');
    });
  });

  describe('Resource', () => {
    const { Resource } = Enum;
  
    it('correctly defines GAUGE', () => {
      const { GAUGE } = Resource;
  
      GAUGE.should.eql('gauges');
    });
  
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

  describe('Protocol', () => {
    const { Protocol } = Enum;

    it('correctly defines SMTP', () => {
      const { SMTP } = Protocol;
  
      SMTP.should.eql('smtp');
    });

    it('correctly defines SMS', () => {
      const { SMS } = Protocol;
  
      SMS.should.eql('sms');
    });
  });

  describe('Determiner', () => {
    const { Determiner } = Enum;

    it('correctly defines ONE', () => {
      const { ONE } = Determiner;
  
      ONE.should.eql('one');
    });

    it('correctly defines SOME', () => {
      const { SOME } = Determiner;
  
      SOME.should.eql('some');
    });
  });

  describe('Direction', () => {
    const { Direction } = Enum;

    it('correctly defines INBOUND', () => {
      const { INBOUND } = Direction;
  
      INBOUND.should.eql('inbound');
    });

    it('correctly defines OUTBOUND', () => {
      const { OUTBOUND } = Direction;
  
      OUTBOUND.should.eql('outbound');
    });
  });

  describe('Subtype', () => {
    const { Subtype } = Enum;

    it('correctly defines INBOUND', () => {
      const { LONG_RUNNING } = Subtype;
  
      LONG_RUNNING.should.eql('long_running');
    });

    it('correctly defines OUTBOUND', () => {
      const { PERIODIC } = Subtype;
  
      PERIODIC.should.eql('periodic');
    });
  });

  describe('Color', () => {
    const { Color } = Enum;

    it('correctly defines BLUE', () => {
      const { BLUE } = Color;
  
      BLUE.should.eql('blue');
    });

    it('correctly defines BROWN', () => {
      const { BROWN } = Color;
  
      BROWN.should.eql('brown');
    });

    it('correctly defines GREEN', () => {
      const { GREEN } = Color;
  
      GREEN.should.eql('green');
    });

    it('correctly defines ORANGE', () => {
      const { ORANGE } = Color;
  
      ORANGE.should.eql('orange');
    });

    it('correctly defines PURPLE', () => {
      const { PURPLE } = Color;
  
      PURPLE.should.eql('purple');
    });

    it('correctly defines RED', () => {
      const { RED } = Color;
  
      RED.should.eql('red');
    });

    it('correctly defines TEAL', () => {
      const { TEAL } = Color;
  
      TEAL.should.eql('teal');
    });

    it('correctly defines WHITE', () => {
      const { WHITE } = Color;
  
      WHITE.should.eql('white');
    });

    it('correctly defines YELLOW', () => {
      const { YELLOW } = Color;
  
      YELLOW.should.eql('yellow');
    });

    it('correctly defines NONE', () => {
      const { NONE } = Color;
  
      (NONE === null).should.eql(true);
    });
  });

  describe('Icon', () => {
    const { Icon } = Enum;

    it('correctly defines THUMBS_UP', () => {
      const { THUMBS_UP } = Icon;
  
      THUMBS_UP.should.eql('thumbs-up');
    });

    it('correctly defines CALENDAR', () => {
      const { CALENDAR } = Icon;
  
      CALENDAR.should.eql('calendar');
    });

    it('correctly defines SERVER', () => {
      const { SERVER } = Icon;
  
      SERVER.should.eql('server');
    });

    it('correctly defines SIGNAL', () => {
      const { SIGNAL } = Icon;
  
      SIGNAL.should.eql('wifi');
    });

    it('correctly defines GIT', () => {
      const { GIT } = Icon;
  
      GIT.should.eql('git');
    });

    it('correctly defines CODE', () => {
      const { CODE } = Icon;
  
      CODE.should.eql('code');
    });

    it('correctly defines CHECK', () => {
      const { CHECK } = Icon;
  
      CHECK.should.eql('check');
    });

    it('correctly defines ERROR', () => {
      const { ERROR } = Icon;
  
      ERROR.should.eql('exclamation-triangle');
    });

    it('correctly defines PENCIL', () => {
      const { PENCIL } = Icon;
  
      PENCIL.should.eql('pencil');
    });

    it('correctly defines CHAIN', () => {
      const { CHAIN } = Icon;
  
      CHAIN.should.eql('chain');
    });

    it('correctly defines CHAIN_BROKEN', () => {
      const { CHAIN_BROKEN } = Icon;
  
      CHAIN_BROKEN.should.eql('chain-broken');
    });

    it('correctly defines NONE', () => {
      const { NONE } = Icon;
  
      (NONE === null).should.eql(true);
    });
  });

  describe('Strategy', () => {
    const { Strategy } = Enum;

    it('correctly defines FALLBACK', () => {
      const { FALLBACK } = Strategy;
  
      (typeof FALLBACK).should.eql('symbol');
    });

    it('correctly defines ID', () => {
      const { ID } = Strategy;
  
      (typeof ID).should.eql('symbol');
    });
  });
});
