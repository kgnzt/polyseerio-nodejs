'use strict';

var lodash = require('lodash'),
    _require = require('./helper'),
    resourceToType = _require.resourceToType;


var Resource = {
  ALERT: 'alerts',
  CHANNEL: 'channels',
  ENVIRONMENT: 'environments',
  ENVIRONMENT_MESSAGE: 'environment-messages',
  EVENT: 'events',
  EXPECTATION: 'expectations',
  GAUGE: 'gauges',
  INSTANCE: 'instances',
  LOGIC_BLOCK: 'logic-blocks',
  MEMBER: 'members',
  MESSAGE: 'messages',
  SETTING: 'settings',
  TASK: 'tasks'
};

var Type = lodash.reduce(Resource, function (acc, value, key) {
  acc[key] = resourceToType(value);

  return acc;
}, {});

var Determiner = {
  ONE: 'one',
  SOME: 'some'
};

var Color = {
  BLUE: 'blue',
  BROWN: 'brown',
  GREEN: 'green',
  ORANGE: 'orange',
  PURPLE: 'purple',
  RED: 'red',
  TEAL: 'teal',
  WHITE: 'white',
  YELLOW: 'yellow',
  NONE: null
};

var Icon = {
  THUMBS_UP: 'thumbs-up',
  CALENDAR: 'calendar',
  SERVER: 'server',
  SIGNAL: 'wifi',
  GIT: 'git',
  CODE: 'code',
  CHECK: 'check',
  ERROR: 'exclamation-triangle',
  PENCIL: 'pencil',
  CHAIN: 'chain',
  CHAIN_BROKEN: 'chain-broken',
  NONE: null
};

var Strategy = {
  FALLBACK: Symbol('strategy-fallback'),
  ID: Symbol('strategy-id')
};

var Direction = {
  INBOUND: 'inbound',
  OUTBOUND: 'outbound'
};

var Subtype = {
  LONG_RUNNING: 'long_running',
  PERIODIC: 'periodic'
};

var Protocol = {
  SMTP: 'smtp',
  SMS: 'sms'
};

module.exports = {
  Color: Color,
  Determiner: Determiner,
  Direction: Direction,
  Icon: Icon,
  Protocol: Protocol,
  Resource: Resource,
  Strategy: Strategy,
  Subtype: Subtype,
  Type: Type
};