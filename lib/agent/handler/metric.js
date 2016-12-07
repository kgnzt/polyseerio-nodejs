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
  }
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
  }
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
  }
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
  }
};
