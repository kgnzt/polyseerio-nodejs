'use strict';

const Resource   = require('../resource'),
      { STATIC,
        METHOD } = require('./definition_constant');

/**
 * Resources that can be created.
 */
const CreatableStatics = [
  'create'
];

/**
 * Resources that can be read.
 */
const ReadableStatics = [
  'find',
  'findById'
];

/**
 * Resources that can be deleted.
 */
const DeletableStatics = [
  'remove'
];

/**
 * Resources that can be update.
 */
const UpdatableStatics = [
  'update'
];

/**
 * Creatable, readable, updatable, deletable resources.
 */
const CRUDStatics = [
  ...CreatableStatics,
  ...ReadableStatics,
  ...UpdatableStatics,
  ...DeletableStatics
];

/**
 * Required instance methods. // TODO: Does this make sense here?
 */
const ResourceInstance = [
  'toJSON'
];

/**
 * Resources that can be saved (updated and created).
 */
const SavableInstance = [
  'save'
];

/**
 * Resource definitions.
 */
const DEFINITION = {
  [Resource.ALERT]: {
    [STATIC]: [
      ...CRUDStatics,
      'findByName',
      'trigger'
    ],
    [METHOD]: [
      ...SavableInstance,
      ...ResourceInstance,
      'trigger',
      'remove'
    ]
  },
  [Resource.CHANNEL]: {
    [STATIC]: [
      ...CRUDStatics,
      'findByName',
      'message'
    ],
    [METHOD]: [
      ...SavableInstance,
      ...ResourceInstance,
      'message',
      'remove'
    ]
  },
  [Resource.ENVIRONMENT]: {
    [STATIC]: [
      ...CRUDStatics,
      'findByName',
      'message'
    ],
    [METHOD]: [
      ...SavableInstance,
      ...ResourceInstance,
      'message',
      'remove'
    ]
  },
  [Resource.EVENT]: {
    [STATIC]: [
      ...CreatableStatics,
      ...ReadableStatics
    ],
    [METHOD]: [
      ...SavableInstance,
      ...ResourceInstance
    ]
  },
  [Resource.EXPECTATION]: {
    [STATIC]: [
      ...CRUDStatics,
      'findByName',
      'check',
    ],
    [METHOD]: [
      ...SavableInstance,
      ...ResourceInstance,
      'remove',
      'check'
    ]
  },
  [Resource.GAUGE]: {
    [STATIC]: [],
    [METHOD]: [
      ...ResourceInstance
    ]
  },
  [Resource.INSTANCE]: {
    [STATIC]: [
      ...CRUDStatics,
      'findByName',
      'gauge',
      'attach'
    ],
    [METHOD]: [
      ...SavableInstance,
      ...ResourceInstance,
      'detach',
      'gauge',
      'addGauge',
      'attach',
      'detach',
      'remove'
    ]
  },
  [Resource.LOGIC_BLOCK]: {
    [STATIC]: [
      ...CRUDStatics,
      'findByName',
      'execute'
    ],
    [METHOD]: [
      ...SavableInstance,
      ...ResourceInstance,
      'remove',
      'execute'
    ]
  },
  [Resource.MEMBER]: {
    [STATIC]: [
      ...CRUDStatics,
    ],
    [METHOD]: [
      ...SavableInstance,
      ...ResourceInstance,
      'remove'
    ]
  },
  [Resource.MESSAGE]: {
    [STATIC]: [
      ...CRUDStatics,
    ],
    [METHOD]: [
      ...SavableInstance,
      ...ResourceInstance,
      'remove'
    ]
  },
  [Resource.SETTING]: {
    [STATIC]: [
      ...UpdatableStatics,
      'retrieve'
    ]
  },
  [Resource.TASK]: {
    [STATIC]: [
      ...CRUDStatics,
    ],
    [METHOD]: [
      ...SavableInstance,
      ...ResourceInstance,
      'remove'
    ]
  }
};

module.exports = DEFINITION;
