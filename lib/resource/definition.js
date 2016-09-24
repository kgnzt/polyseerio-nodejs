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
      ...SavableInstance
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
      'remove'
    ]
  },
  [Resource.MESSAGE]: {
    statics: [
      ...CRUDStatics,
    ],
    instance: [
      ...SavableInstance,
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
      'remove'
    ]
  }
};
