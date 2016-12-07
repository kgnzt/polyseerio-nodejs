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
  [Metric.MEMORY] (client, instance, proc) {
    instance.addGauge('memory', resolveMemory(proc));
  },

  /**
   * Establish process cpu usage tracking.
   *
   * @param {Client}
   * @param {Instance}
   * @param {process}
   * @return {Promise}
   */
  [Metric.CPU] (client, instance, proc) {
    instance.addGauge('cpu_user', resolveCpuUser(proc));
    instance.addGauge('cpu_system', resolveCpuSystem(proc));
  },

  /**
   * Establish process uptime tracking.
   *
   * @param {Client}
   * @param {Instance}
   * @param {process}
   * @return {Promise}
   */
  [Metric.UPTIME] (client, instance, proc) {
    instance.addGauge('uptime', resolveUptime(proc));
  }
};
