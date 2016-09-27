'use strict';

const should = require('should');

describe('Enum', () => {
  const Enum = require('../../lib/enum');

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
