'use strict';

const Resource = require('../resource');

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
 * Creatable, readable, updatable, deletable resources.
 */
const CRUDStatics = [
  ...CreatableStatics,
  ...ReadableStatics,
  ...UpdatableStatics,
  ...DeletableStatics
];

/**
 * Resource definitions.
 */
module.exports = {
  [Resource.ALERT]: {
    statics: [
      ...CRUDStatics,
      'findByName',
      'trigger'
    ],
    instance: [
      ...SavableInstance,
      ...ResourceInstance,
      'trigger',
      'remove'
    ]
  },
  [Resource.CHANNEL]: {
    statics: [
      ...CRUDStatics,
      'findByName',
      'message'
    ],
    instance: [
      ...SavableInstance,
      ...ResourceInstance,
      'message',
      'remove'
    ]
  },
  [Resource.ENVIRONMENT]: {
    statics: [
      ...CRUDStatics,
      'findByName',
      'message'
    ],
    instance: [
      ...SavableInstance,
      ...ResourceInstance,
      'message',
      'remove'
    ]
  },
  [Resource.EVENT]: {
    statics: [
      ...CreatableStatics,
      ...ReadableStatics
    ],
    instance: [
      ...SavableInstance,
      ...ResourceInstance
    ]
  },
  [Resource.EXPECTATION]: {
    statics: [
      ...CRUDStatics,
      'findByName',
      'check',
    ],
    instance: [
      ...SavableInstance,
      ...ResourceInstance,
      'remove',
      'check'
    ]
  },
  [Resource.INSTANCE]: {
    statics: [
      ...CRUDStatics,
      'findByName',
      'attach'
    ],
    instance: [
      ...SavableInstance,
      ...ResourceInstance,
      'remove',
      'attach'
    ]
  },
  [Resource.LOGIC_BLOCK]: {
    statics: [
      ...CRUDStatics,
      'findByName',
      'execute'
    ],
    instance: [
      ...SavableInstance,
      ...ResourceInstance,
      'remove',
      'execute'
    ]
  },
  [Resource.MEMBER]: {
    statics: [
      ...CRUDStatics,
    ],
    instance: [
      ...SavableInstance,
      ...ResourceInstance,
      'remove'
    ]
  },
  [Resource.MESSAGE]: {
    statics: [
      ...CRUDStatics,
    ],
    instance: [
      ...SavableInstance,
      ...ResourceInstance,
      'remove'
    ]
  },
  [Resource.SETTING]: {
    statics: [
      ...UpdatableStatics,
      'retrieve'
    ]
  },
  [Resource.TASK]: {
    statics: [
      ...CRUDStatics,
    ],
    instance: [
      ...SavableInstance,
      ...ResourceInstance,
      'remove'
    ]
  }
};
