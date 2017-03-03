'use strict';

var _Resource$ALERT, _Resource$CHANNEL, _Resource$ENVIRONMENT, _Resource$EVENT, _Resource$EXPECTATION, _Resource$GAUGE, _Resource$INSTANCE, _Resource$LOGIC_BLOCK, _Resource$MEMBER, _Resource$MESSAGE, _Resource$TASK, _DEFINITION;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _require = require('../enum'),
    Resource = _require.Resource,
    _require2 = require('./definition_constant'),
    STATIC = _require2.STATIC,
    METHOD = _require2.METHOD;

/**
 * Resources that can be created.
 */


var CreatableStatics = ['create'];

/**
 * Resources that can be read.
 */
var ReadableStatics = ['find', 'findById'];

/**
 * Resources that can be deleted.
 */
var DeletableStatics = ['remove'];

/**
 * Resources that can be update.
 */
var UpdatableStatics = ['update'];

/**
 * Creatable, readable, updatable, deletable resources.
 */
var CRUDStatics = [].concat(CreatableStatics, ReadableStatics, UpdatableStatics, DeletableStatics);

/**
 * Required instance methods. // TODO: Does this make sense here?
 */
var ResourceInstance = ['get', 'isNew', 'set', 'setProperties', 'toJSON'];

/**
 * Resources that can be saved (updated and created).
 */
var SavableInstance = ['save'];

/**
 * Resource definitions.
 */
var DEFINITION = (_DEFINITION = {}, _defineProperty(_DEFINITION, Resource.ALERT, (_Resource$ALERT = {}, _defineProperty(_Resource$ALERT, STATIC, [].concat(_toConsumableArray(CRUDStatics), ['findByName', 'trigger'])), _defineProperty(_Resource$ALERT, METHOD, [].concat(SavableInstance, ResourceInstance, ['trigger', 'remove'])), _Resource$ALERT)), _defineProperty(_DEFINITION, Resource.CHANNEL, (_Resource$CHANNEL = {}, _defineProperty(_Resource$CHANNEL, STATIC, [].concat(_toConsumableArray(CRUDStatics), ['findByName', 'message'])), _defineProperty(_Resource$CHANNEL, METHOD, [].concat(SavableInstance, ResourceInstance, ['message', 'remove'])), _Resource$CHANNEL)), _defineProperty(_DEFINITION, Resource.ENVIRONMENT, (_Resource$ENVIRONMENT = {}, _defineProperty(_Resource$ENVIRONMENT, STATIC, [].concat(_toConsumableArray(CRUDStatics), ['findByName', 'message'])), _defineProperty(_Resource$ENVIRONMENT, METHOD, [].concat(SavableInstance, ResourceInstance, ['message', 'remove'])), _Resource$ENVIRONMENT)), _defineProperty(_DEFINITION, Resource.EVENT, (_Resource$EVENT = {}, _defineProperty(_Resource$EVENT, STATIC, [].concat(CreatableStatics, ReadableStatics)), _defineProperty(_Resource$EVENT, METHOD, [].concat(SavableInstance, ResourceInstance)), _Resource$EVENT)), _defineProperty(_DEFINITION, Resource.EXPECTATION, (_Resource$EXPECTATION = {}, _defineProperty(_Resource$EXPECTATION, STATIC, [].concat(_toConsumableArray(CRUDStatics), ['findByName', 'check'])), _defineProperty(_Resource$EXPECTATION, METHOD, [].concat(SavableInstance, ResourceInstance, ['remove', 'check'])), _Resource$EXPECTATION)), _defineProperty(_DEFINITION, Resource.GAUGE, (_Resource$GAUGE = {}, _defineProperty(_Resource$GAUGE, STATIC, []), _defineProperty(_Resource$GAUGE, METHOD, [].concat(ResourceInstance)), _Resource$GAUGE)), _defineProperty(_DEFINITION, Resource.INSTANCE, (_Resource$INSTANCE = {}, _defineProperty(_Resource$INSTANCE, STATIC, [].concat(_toConsumableArray(CRUDStatics), ['findByName', 'gauge', 'attach'])), _defineProperty(_Resource$INSTANCE, METHOD, [].concat(SavableInstance, ResourceInstance, ['gauge', 'addGauge', 'fact', 'addFact', 'attach', 'detach', 'remove'])), _Resource$INSTANCE)), _defineProperty(_DEFINITION, Resource.LOGIC_BLOCK, (_Resource$LOGIC_BLOCK = {}, _defineProperty(_Resource$LOGIC_BLOCK, STATIC, [].concat(_toConsumableArray(CRUDStatics), ['findByName', 'execute'])), _defineProperty(_Resource$LOGIC_BLOCK, METHOD, [].concat(SavableInstance, ResourceInstance, ['remove', 'execute'])), _Resource$LOGIC_BLOCK)), _defineProperty(_DEFINITION, Resource.MEMBER, (_Resource$MEMBER = {}, _defineProperty(_Resource$MEMBER, STATIC, [].concat(_toConsumableArray(CRUDStatics))), _defineProperty(_Resource$MEMBER, METHOD, [].concat(SavableInstance, ResourceInstance, ['remove'])), _Resource$MEMBER)), _defineProperty(_DEFINITION, Resource.MESSAGE, (_Resource$MESSAGE = {}, _defineProperty(_Resource$MESSAGE, STATIC, [].concat(_toConsumableArray(CRUDStatics))), _defineProperty(_Resource$MESSAGE, METHOD, [].concat(SavableInstance, ResourceInstance)), _Resource$MESSAGE)), _defineProperty(_DEFINITION, Resource.SETTING, _defineProperty({}, STATIC, [].concat(UpdatableStatics, ['retrieve']))), _defineProperty(_DEFINITION, Resource.TASK, (_Resource$TASK = {}, _defineProperty(_Resource$TASK, STATIC, [].concat(_toConsumableArray(CRUDStatics))), _defineProperty(_Resource$TASK, METHOD, [].concat(SavableInstance, ResourceInstance, ['remove'])), _Resource$TASK)), _DEFINITION);

module.exports = DEFINITION;