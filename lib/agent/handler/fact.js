'use strict';

var _module$exports;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var os = require('os'),
    _require = require('../enum'),
    Fact = _require.Fact;


module.exports = (_module$exports = {}, _defineProperty(_module$exports, Fact.ARCHITECTURE, function (_config, client) {
  client.instance.addFact('architecture', process.arch);
}), _defineProperty(_module$exports, Fact.CPU_COUNT, function (_config, client) {
  client.instance.addFact('cpu_count', os.cpus().length);
}), _defineProperty(_module$exports, Fact.ENDIANNESS, function (_config, client) {
  client.instance.addFact('endianness', os.endianness());
}), _defineProperty(_module$exports, Fact.FREE_MEMORY, function (_config, client) {
  client.instance.addFact('free_memory', function () {
    return os.freemem();
  });
}), _defineProperty(_module$exports, Fact.HOME_DIRECTORY, function (_config, client) {
  client.instance.addFact('home_directory', os.homedir());
}), _defineProperty(_module$exports, Fact.HOSTNAME, function (_config, client) {
  client.instance.addFact('hostname', os.hostname());
}), _defineProperty(_module$exports, Fact.GID, function (_config, client) {
  client.instance.addFact('gid', process.getgid());
}), _defineProperty(_module$exports, Fact.LAUNCH_ARGUMENTS, function (_config, client) {
  var value = process.argv.join(' ');

  client.instance.addFact('launch_arguments', value);
}), _defineProperty(_module$exports, Fact.UPTIME, function (_config, client) {
  client.instance.addFact('uptime', function () {
    return process.uptime();
  });
}), _defineProperty(_module$exports, Fact.NODE_VERSION, function (_config, client) {
  client.instance.addFact('node_version', process.versions.node);
}), _defineProperty(_module$exports, Fact.PID, function (_config, client) {
  client.instance.addFact('pid', process.pid);
}), _defineProperty(_module$exports, Fact.PLATFORM, function (_config, client) {
  client.instance.addFact('platform', process.platform);
}), _defineProperty(_module$exports, Fact.TITLE, function (_config, client) {
  client.instance.addFact('title', process.title);
}), _defineProperty(_module$exports, Fact.UID, function (_config, client) {
  client.instance.addFact('uid', process.getuid());
}), _defineProperty(_module$exports, Fact.V8_VERSION, function (_config, client) {
  client.instance.addFact('v8_version', process.versions.v8);
}), _module$exports);