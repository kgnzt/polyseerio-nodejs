'use strict';

const { Metric } = require('../enum');

module.exports = {
  [Metric.MEMORY] (client, instance, proc) {
    const usage = proc.memoryUsage();

    return instance.gauge({
      memory: usage.rss
    }).then(console.log, console.log);
  }
};
