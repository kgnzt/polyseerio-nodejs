'use strict';

var _module$exports;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../enum'),
    Metric = _require.Metric;

/**
 * Resolves the processes current memory.
 *
 * @param {process}
 * @return {function}
 */


function resolveMemory(proc) {
  return function () {
    return proc.memoryUsage().rss;
  };
}

/**
 * Resolves the current user cpu usage.
 *
 * @param {process}
 * @return {function}
 */
function resolveCpuUser(proc) {
  return function () {
    return proc.cpuUsage().user;
  };
}

/**
 * Resolves the current system cpu usage.
 *
 * @param {process}
 * @return {function}
 */
function resolveCpuSystem(proc) {
  return function () {
    return proc.cpuUsage().system;
  };
}

/**
 * Resolves uptime.
 *
 * @param {process}
 * @return {function}
 */
function resolveUptime(proc) {
  return function () {
    return proc.uptime();
  };
}

module.exports = (_module$exports = {}, _defineProperty(_module$exports, Metric.MEMORY, function (_config, client) {
  client.instance.addGauge('memory', resolveMemory(process));
}), _defineProperty(_module$exports, Metric.CPU, function (_config, client) {
  client.instance.addGauge('cpu_user', resolveCpuUser(process));
  client.instance.addGauge('cpu_system', resolveCpuSystem(process));
}), _defineProperty(_module$exports, Metric.UPTIME, function (_config, client) {
  client.instance.addGauge('uptime', resolveUptime(process));
}), _module$exports);