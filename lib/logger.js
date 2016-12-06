'use strict';

const winston = require('winston');

module.exports = new winston.Logger({
  level: process.env.LOG_LEVEL || 'error',
  transports: [
    new winston.transports.Console()
  ]
});
