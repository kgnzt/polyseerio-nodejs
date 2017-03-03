'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var lodash = require('lodash'),
    DEFINITION = require('./definition'),
    Base = require('./base'),
    _require = require('./definition_constant'),
    STATIC = _require.STATIC,
    METHOD = _require.METHOD,
    _require2 = require('../helper'),
    forwardThis = _require2.forwardThis,
    _require3 = require('../sdk/factory'),
    staticFactory = _require3.staticFactory,
    methodFactory = _require3.methodFactory;

/**
 * Determine if a resource definition should generate a singleton.
 *
 * @param {object}
 * @return {boolean}
 */
function definesSingleton(definition) {
  return !(METHOD in definition) || definition[METHOD].length === 0;
}

/**
 * Creates a new Resource class.
 *
 * @param {string}
 * @return {function}
 */
function createResource(resource) {
  return function (_Base) {
    _inherits(_class, _Base);

    function _class() {
      var _ref;

      _classCallCheck(this, _class);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args)));

      _this.resource = resource;
      return _this;
    }

    return _class;
  }(Base);
}

/**
 * Add a static method to a Resource.
 *
 * @param {function}
 * @param {function}
 * @param {string}
 * @return {object}
 */
function addStatic(Resource, method, name) {
  Resource[name] = method;

  return Resource;
}

/**
 * Add an instance method to a Resource.
 *
 * @param {function}
 * @param {function}
 * @param {string}
 * @return {object}
 */
function addMethod(Resource, method, name) {
  // Instance methods are written with the instance as the first parameter.
  // forwardThis handles forwarding the context (this) to exported instance 
  // methods.
  Resource.prototype[name] = forwardThis(method);

  return Resource;
}

/**
 * Add a collection of static methods to a Resource.
 *
 * @param {function}
 * @param {array[object]}
 * @return {object}
 */
function addStatics(Resource) {
  var statics = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  return lodash.reduce(statics, addStatic, Resource);
}

/**
 * Add a collection of instance methods to a Resource.
 *
 * @param {function}
 * @param {request}
 * @param {array[object]}
 * @return {object}
 */
function addMethods(Resource, request) {
  var methods = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (lodash.isEmpty(methods)) {
    return Resource;
  }

  // TODO: move this out of here, this is not approprite.
  Resource.prototype._request = request; // TODO: is this the right place? unique step in create?

  return lodash.reduce(methods, addMethod, Resource);
}

/**
 * Get a factory memoize key.
 *
 * @param {string}
 * @param {_}
 * @param {_}
 * @param {number}
 * @return {string}
 */
function getMemoizeKey(resource, _, __, cid) {
  return resource + '.' + cid;
}

/**
 * Create a resource.
 *
 * @param {string}
 * @param {request}
 * @param {object}
 * @return {function}
 */
function _factory(resource, request) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!(resource in DEFINITION)) {
    throw new Error('Could not find definition for resource: ' + resource + '.');
  }

  var definition = DEFINITION[resource],
      isSingleton = definesSingleton(definition);

  var Resource = definesSingleton(definition) ? {} : createResource(resource);

  var functions = staticFactory(request, resource, definition[STATIC], options),
      methods = methodFactory(request, resource, definition[METHOD], options);

  if (!isSingleton) {
    Resource.prototype.copts = options;
    Resource.prototype.set = function (key, value) {
      this._attributes[key] = value;
    };
    Resource.prototype.get = function (key) {
      if (lodash.has(this._attributes), key) {
        return this._attributes[key];
      }

      return null;
    };
  }

  addStatics(Resource, functions);
  addMethods(Resource, request, methods);

  return Resource;
}

var factory = lodash.memoize(_factory, getMemoizeKey);

var factoryExports = {
  addMethod: addMethod,
  addStatic: addStatic,
  addMethods: addMethods,
  addStatics: addStatics,
  getMemoizeKey: getMemoizeKey,
  createResource: createResource,
  definesSingleton: definesSingleton
};

Object.assign(factory, factoryExports);

module.exports = factory;