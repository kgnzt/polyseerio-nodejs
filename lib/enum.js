'use strict';

const Determiner = {
  ONE: 'one',
  SOME: 'some'
};

const Color = {
  BLUE:   'blue',
  BROWN:  'brown',
  GREEN:  'green',
  ORANGE: 'orange',
  PURPLE: 'purple',
  RED:    'red',
  TEAL:   'teal',
  WHITE:  'white',
  YELLOW: 'yellow',
  NONE:   null
};

const Icon = {
  THUMBS_UP:    'thumbs-up',
  CALENDAR:     'calendar',
  SERVER:       'server',
  SIGNAL:       'wifi',
  GIT:          'git',
  CODE:         'code',
  CHECK:        'check',
  ERROR:        'exclamation-triangle',
  PENCIL:       'pencil',
  CHAIN:        'chain',
  CHAIN_BROKEN: 'chain-broken',
  NONE:         null
};

const Strategy = {
  FALLBACK: Symbol('strategy-fallback'),
  ID:       Symbol('strategy-id')
};

const Direction = {
  INBOUND:  'inbound',
  OUTBOUND: 'outbound'
};

const Subtype = {
  LONG_RUNNING: 'long_running',
  PERIODIC:     'periodic'
};

module.exports = {
  Color,
  Subtype,
  Icon,
  Strategy,
  Direction,
  Determiner
};
