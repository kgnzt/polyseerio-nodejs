'use strict';

const { Metric } = require('../enum');

/**
 * Resolves the processes current memory.
 *
 * @param {process}
 * @return {function}
 */
function resolveMemory (proc) {
  return () => {
    return proc.memoryUsage().rss;
  };
}

/**
 * Resolves the current user cpu usage.
 *
 * @param {process}
 * @return {function}
 */
function resolveCpuUser (proc) {
  return () => {
    return proc.cpuUsage().user;
  };
}

/**
 * Resolves the current system cpu usage.
 *
 * @param {process}
 * @return {function}
 */
function resolveCpuSystem (proc) {
  return () => {
    return proc.cpuUsage().system;
  };
}

/**
 * Resolves uptime.
 *
 * @param {process}
 * @return {function}
 */
function resolveUptime (proc) {
  return () => {
    return proc.uptime();
  };
}

module.exports = {
  /**
   * Establish process memory tracking.
   *
   * @param {Client}
   * @param {Instance}
   * @param {process}
   * @return {Promise}
   */
  [Metric.MEMORY] (_config, client) {
    client.instance.addGauge('memory', resolveMemory(process));
  },

  /**
   * Establish process cpu usage tracking.
   *
   * @param {Client}
   * @param {Instance}
   * @param {process}
   * @return {Promise}
   */
  [Metric.CPU] (_config, client) {
    client.instance.addGauge('cpu_user', resolveCpuUser(process));
    client.instance.addGauge('cpu_system', resolveCpuSystem(process));
  },

  /**
   * Establish process uptime tracking.
   *
   * @param {Client}
   * @param {Instance}
   * @param {process}
   * @return {Promise}
   */
  [Metric.UPTIME] (_config, client) {
    client.instance.addGauge('uptime', resolveUptime(process));
  }
};
