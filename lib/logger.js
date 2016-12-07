'use strict';

const winston = require('winston');

// make 'debug' default log level
module.exports = new winston.Logger({
  level: 'debug',
  transports: [
    new winston.transports.Console()
  ]
});
